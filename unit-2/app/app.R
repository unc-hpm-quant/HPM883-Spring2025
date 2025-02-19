library(shiny)
library(ggplot2)

ui <- fluidPage(
  titlePanel("Optimal Experimental Design for One Treatment vs. One Control"),
  
  # Add help text at the top
  fluidRow(
    column(12,
      h4("Understanding Power Analysis and Optimal Design"),
      p("This app helps you determine optimal sample sizes and allocation ratios for experiments.",
        "The calculations consider both statistical power and practical constraints."),
      p("Key concepts:"),
      tags$ul(
        tags$li(strong("Minimum Detectable Effect (MDE):"), 
               "The smallest true effect size that your study can reliably detect with the specified power."),
        tags$li(strong("Optimal Allocation:"), 
               "The best way to divide participants between treatment and control groups, considering:",
               tags$ul(
                 tags$li("Statistical efficiency (minimizing MDE)"),
                 tags$li("Cost constraints"),
                 tags$li("Practical implementation"))
               ),
        tags$li(strong("Power vs. Sample Size:"), 
               "There's always a trade-off - higher power requires larger samples.")
      ),
      p("Adjust the parameters below to explore how different choices affect your study design."),
      tags$hr()
    )
  ),
  
  sidebarLayout(
    sidebarPanel(
      # --- Choose outcome type (binary or continuous)
      radioButtons(
        inputId = "outcomeType", 
        label = "Outcome Type",
        choices = c("Binary" = "binary", "Continuous" = "continuous"),
        selected = "continuous"
      ),
      div(class = "well",
        h5("Outcome Types:"),
        p(strong("Binary Outcomes:"),
          "Measured as proportions or percentages (e.g., success rates, mortality rates).",
          "The variance is determined by the proportion itself - highest at p=0.5."),
        p(strong("Continuous Outcomes:"),
          "Measured on a continuous scale (e.g., blood pressure, test scores).",
          "Requires estimates of population variance in each group.")
      ),
      
      # --- Significance level (alpha)
      sliderInput(
        inputId = "alpha", 
        label = "Significance level (alpha):",
        min = 0.001, 
        max = 0.10, 
        step = 0.001,
        value = 0.05
      ),
      div(class = "well",
        h5("Significance Level (α):"),
        p("The probability of falsely concluding there is an effect when there isn't one (Type I error)."),
        tags$ul(
          tags$li(strong("0.05 (5%)"), ": Standard choice - 1 in 20 chance of false positive"),
          tags$li(strong("0.01 (1%)"), ": More conservative - use for critical decisions"),
          tags$li(strong("0.10 (10%)"), ": More liberal - might use in pilot studies")
        )
      ),
      
      # --- Power (1 - beta)
      sliderInput(
        inputId = "power", 
        label = "Statistical Power (1 - beta):",
        min = 0.50, 
        max = 0.99, 
        step = 0.01,
        value = 0.80
      ),
      div(class = "well",
        h5("Statistical Power (1-β):"),
        p("The probability of detecting a true effect when it exists."),
        tags$ul(
          tags$li(strong("0.80 (80%)"), ": Standard choice - accepts 20% chance of missing real effects"),
          tags$li(strong("0.90 (90%)"), ": Higher power - use for critical studies, but requires larger samples"),
          tags$li(strong("0.70 (70%)"), ": Lower power - might use in pilot studies or with resource constraints")
        ),
        p("Remember: Increasing power requires larger sample sizes, often substantially.")
      ),
      
      # --- Parameters for continuous outcome
      conditionalPanel(
        condition = "input.outcomeType == 'continuous'",
        numericInput("sigmaT", "Treatment Variance (σ²_T):", 1),
        numericInput("sigmaC", "Control Variance (σ²_C):", 1),
        helpText("The expected variances in each group. If unknown, assume equal variances.")
      ),
      
      # --- Parameters for binary outcome
      conditionalPanel(
        condition = "input.outcomeType == 'binary'",
        sliderInput("pT", "Treatment proportion (p_T):",
                    min = 0, max = 1, step = 0.01, value = 0.3),
        sliderInput("pC", "Control proportion (p_C):",
                    min = 0, max = 1, step = 0.01, value = 0.3),
        helpText("The expected proportions in each group. For a new intervention,",
                 "p_C might be known from historical data.")
      ),
      
      # --- Allocation: either fix total sample size or total cost
      radioButtons(
        inputId = "constraintType",
        label = "Constraint Type:",
        choices = c("Fixed Total Sample Size" = "sample",
                    "Fixed Total Cost"        = "cost")
      ),
      div(class = "well",
        h5("Design Constraints:"),
        p(strong("Fixed Total Sample Size:"),
          "Use when you have a specific total number of participants available.",
          "The app will help you determine the optimal split between groups."),
        p(strong("Fixed Total Cost:"),
          "Use when you have a fixed budget and different costs per group.",
          "Common when treatment is more expensive than control, or when recruitment costs differ.")
      ),
      
      # --- If total sample size is the constraint
      conditionalPanel(
        condition = "input.constraintType == 'sample'",
        numericInput("N", "Total Sample Size (N):", 200, min = 2, step = 1)
      ),
      
      # --- If total cost is the constraint
      conditionalPanel(
        condition = "input.constraintType == 'cost'",
        numericInput("costT", "Cost per Treatment Unit:", 2, min = 1, step = 1),
        numericInput("costC", "Cost per Control Unit:", 1, min = 1, step = 1),
        numericInput("budget", "Total Budget:", 300, min = 1, step = 1)
      ),
      
      # --- Option to let the user pick ratio or find optimum
      radioButtons(
        inputId = "ratioChoice",
        label = "Allocation Choice:",
        choices = c("Manually Pick Ratio" = "manual",
                    "Find Optimal Ratio"  = "optimal")
      ),
      
      sliderInput(
        inputId = "ratio",
        label = "Treatment:Control Ratio (r = n_T / n_C):",
        min = 0.1,
        max = 10,
        step = 0.1,
        value = 1
      )
    ),
    
    mainPanel(
      tabsetPanel(
        tabPanel("MDE vs. Ratio", 
                 plotOutput("plotMDE"),
                 br(),
                 verbatimTextOutput("textResult"),
                 br(),
                 h4("Step-by-Step Calculations"),
                 uiOutput("mdeCalcSteps")
        ),
        tabPanel("Cost Allocation Plot",
                 plotOutput("plotCost", height = "500px"),
                 br(),
                 h4("Step-by-Step Calculations"),
                 uiOutput("costCalcSteps"),
                 br(),
                 helpText("This plot shows the budget constraint line ",
                          "and iso-MDE curves for different cost allocations ",
                          "(c_C on the x-axis, c_T on the y-axis). ",
                          "The red point indicates the optimal allocation ",
                          "where MDE is minimized, if available.")
        )
      )
    )
  )
)

server <- function(input, output, session) {
  
  # Helper: z-value for alpha/2 (two-sided) and for power
  zAlpha <- reactive({
    qnorm(1 - input$alpha / 2)
  })
  zBeta <- reactive({
    qnorm(input$power)
  })
  
  # Function to compute MDE given n_C, n_T (the sample sizes)
  computeMDE_from_n <- function(nC, nT) {
    if (input$outcomeType == "continuous") {
      sigmaT <- input$sigmaT
      sigmaC <- input$sigmaC
      varTerm <- sigmaT^2 / nT + sigmaC^2 / nC
    } else {
      pT <- input$pT
      pC <- input$pC
      varTerm <- pT*(1 - pT)/nT + pC*(1 - pC)/nC
    }
    (zAlpha() + zBeta()) * sqrt(varTerm)
  }
  
  # Function to compute MDE given a ratio (for either sample or cost constraint)
  computeMDE_ratio <- function(r) {
    # 1) Determine n_T and n_C based on constraints and ratio
    if (input$constraintType == "sample") {
      # n_T + n_C = N, and n_T / n_C = r
      n_C <- input$N / (r + 1)
      n_T <- r * n_C
    } else {
      # costT * n_T + costC * n_C = budget, n_T / n_C = r
      n_C <- input$budget / (r * input$costT + input$costC)
      n_T <- r * n_C
    }
    
    # 2) Compute MDE
    computeMDE_from_n(n_C, n_T)
  }
  
  # Plot: MDE vs. ratio
  output$plotMDE <- renderPlot({
    # We'll vary r from 0.1 to 10 in increments of 0.1
    rVals <- seq(0.1, 10, by = 0.1)
    mdeVals <- sapply(rVals, computeMDE_ratio)
    
    plot(rVals, mdeVals, type = "l", lwd = 2, 
         xlab = "Ratio (n_T / n_C)", ylab = "MDE",
         main = "Minimum Detectable Effect vs. Allocation Ratio")
    
    # If in manual mode, highlight user's chosen ratio
    if (input$ratioChoice == "manual") {
      rUser <- input$ratio
      userMde <- computeMDE_ratio(rUser)
      points(rUser, userMde, col = "red", pch = 19, cex = 1.5)
    }
  })
  
  # Helper function to format numbers nicely
  format_num <- function(x) format(round(x, 4), nsmall = 4)
  
  # Text output: either user-chosen ratio or optimal ratio
  output$textResult <- renderPrint({
    if (input$ratioChoice == "optimal") {
      # Find ratio that yields smallest MDE
      rTest <- seq(0.1, 10, 0.01)
      mdeTest <- sapply(rTest, computeMDE_ratio)
      idxMin <- which.min(mdeTest)
      rOpt <- rTest[idxMin]
      mdeOpt <- mdeTest[idxMin]
      
      if (input$constraintType == "sample") {
        n_C_opt <- input$N / (rOpt + 1)
        n_T_opt <- rOpt * n_C_opt
      } else {
        n_C_opt <- input$budget / (rOpt * input$costT + input$costC)
        n_T_opt <- rOpt * n_C_opt
      }
      
      cat("Optimal Allocation:\n")
      cat("Optimal ratio (n_T / n_C):", round(rOpt, 3), "\n")
      cat("Control group size (n_C):", round(n_C_opt), "\n")
      cat("Treatment group size (n_T):", round(n_T_opt), "\n")
      cat("Minimum Detectable Effect:", round(mdeOpt, 3), "\n")
      
    } else {
      # User-chosen ratio
      r <- input$ratio
      mde <- computeMDE_ratio(r)
      
      if (input$constraintType == "sample") {
        n_C <- input$N / (r + 1)
        n_T <- r * n_C
      } else {
        n_C <- input$budget / (r * input$costT + input$costC)
        n_T <- r * n_C
      }
      
      cat("Current Allocation:\n")
      cat("Ratio (n_T / n_C):", round(r, 3), "\n")
      cat("Control group size (n_C):", round(n_C), "\n")
      cat("Treatment group size (n_T):", round(n_T), "\n")
      cat("Minimum Detectable Effect:", round(mde, 3), "\n")
    }
  })
  
  # Plot: Cost allocation
  output$plotCost <- renderPlot({
    # Only show this plot if user is in "cost" constraint
    if (input$constraintType == "cost") {
      # Generate grid of n_C, n_T values across full plot range
      max_n_C <- input$budget/input$costC * 1.2  # Extend 20% beyond budget line
      max_n_T <- input$budget/input$costT * 1.2
      n_C <- seq(1, max_n_C, length.out = 100)
      n_T <- seq(1, max_n_T, length.out = 100)
      
      # Create matrix of MDE values
      mde_matrix <- matrix(NA, nrow = length(n_C), ncol = length(n_T))
      for (i in 1:length(n_C)) {
        for (j in 1:length(n_T)) {
          mde_matrix[i,j] <- computeMDE_from_n(n_C[i], n_T[j])
        }
      }
      
      # Find optimal allocation
      rTest <- seq(0.1, 10, 0.01)
      mdeTest <- sapply(rTest, computeMDE_ratio)
      rOpt <- rTest[which.min(mdeTest)]
      n_C_opt <- input$budget / (rOpt * input$costT + input$costC)
      n_T_opt <- rOpt * n_C_opt
      mde_opt <- computeMDE_from_n(n_C_opt, n_T_opt)
      
      # Create the plot
      par(mar = c(5, 5, 4, 2))  # Increase margins for labels
      
      # Calculate reasonable MDE range for contours
      min_mde <- max(min(mde_matrix, na.rm = TRUE), mde_opt * 0.8)  # Don't go too far below optimal
      max_mde <- min(max(mde_matrix, na.rm = TRUE), mde_opt * 2.0)  # Don't show extremely large MDEs
      
      # Create evenly spaced levels, including the optimal MDE
      contour_levels <- sort(unique(c(
        seq(min_mde, max_mde, length.out = 8),  # 8 regular levels
        mde_opt  # Include the optimal MDE level
      )))
      
      # Plot contours
      contour(n_C, n_T, mde_matrix, 
              xlab = "Control Group Size (n_C)",
              ylab = "Treatment Group Size (n_T)",
              main = "Cost-constrained Allocation",
              levels = contour_levels,
              labcex = 0.8,  # Slightly smaller contour labels
              drawlabels = TRUE)
      
      # Add budget constraint line
      budget_line_n_C <- seq(0, max_n_C, length.out = 100)
      budget_line_n_T <- (input$budget - input$costC * budget_line_n_C) / input$costT
      lines(budget_line_n_C, budget_line_n_T, col = "red", lwd = 2)
      
      # Add optimal MDE curve (the contour that passes through optimal point)
      n_C_curve <- seq(1, max_n_C, length.out = 200)
      n_T_curve <- numeric(length(n_C_curve))
      for(i in 1:length(n_C_curve)) {
        # Find n_T that gives the optimal MDE for this n_C
        n_T_test <- seq(1, max_n_T, length.out = 200)
        mde_test <- sapply(n_T_test, function(nt) computeMDE_from_n(n_C_curve[i], nt))
        n_T_curve[i] <- n_T_test[which.min(abs(mde_test - mde_opt))]
      }
      lines(n_C_curve, n_T_curve, col = "blue", lwd = 2, lty = 2)
      
      # Add optimal point
      points(n_C_opt, n_T_opt, col = "red", pch = 19, cex = 1.5)
      
      # Add legend for optimal MDE curve
      legend("topright", 
             legend = sprintf("Optimal MDE = %.3f", mde_opt),
             col = "blue", lwd = 2, lty = 2)
    }
  })
  
  # Render step-by-step MDE calculations
  output$mdeCalcSteps <- renderUI({
    # Get current values
    if (input$ratioChoice == "optimal") {
      rTest <- seq(0.1, 10, 0.01)
      mdeTest <- sapply(rTest, computeMDE_ratio)
      r <- rTest[which.min(mdeTest)]
    } else {
      r <- input$ratio
    }
    
    # Calculate sample sizes
    if (input$constraintType == "sample") {
      n_C <- input$N / (r + 1)
      n_T <- r * n_C
    } else {
      n_C <- input$budget / (r * input$costT + input$costC)
      n_T <- r * n_C
    }
    
    # Calculate variances
    if (input$outcomeType == "continuous") {
      varT <- input$sigmaT^2
      varC <- input$sigmaC^2
      var_term <- varT/n_T + varC/n_C
    } else {
      varT <- input$pT * (1 - input$pT)
      varC <- input$pC * (1 - input$pC)
      var_term <- varT/n_T + varC/n_C
    }
    
    # Critical values
    z_alpha <- qnorm(1 - input$alpha/2)
    z_beta <- qnorm(input$power)
    
    # Final MDE
    mde <- (z_alpha + z_beta) * sqrt(var_term)
    
    # Create step-by-step explanation with LaTeX
    tagList(
      withMathJax(),
      h4("Step-by-Step Calculations:"),
      
      h5("1. Sample Size Calculation:"),
      if (input$constraintType == "sample") {
        tagList(
          p(sprintf("With total N = %d and ratio r = %.3f:", input$N, r)),
          withMathJax(sprintf("$$n_C = \\frac{N}{r + 1} = \\frac{%d}{%.3f + 1} = %.1f$$", input$N, r, n_C)),
          withMathJax(sprintf("$$n_T = r \\cdot n_C = %.3f \\cdot %.1f = %.1f$$", r, n_C, n_T))
        )
      } else {
        tagList(
          p(sprintf("With budget = %d, c_T = %d, c_C = %d, and ratio r = %.3f:", 
                    input$budget, input$costT, input$costC, r)),
          withMathJax(sprintf("$$n_C = \\frac{\\text{budget}}{rc_T + c_C} = \\frac{%d}{%.3f \\cdot %d + %d} = %.1f$$", 
                               input$budget, r, input$costT, input$costC, n_C)),
          withMathJax(sprintf("$$n_T = r \\cdot n_C = %.3f \\cdot %.1f = %.1f$$", r, n_C, n_T))
        )
      },
      
      h5("2. Variance Terms:"),
      if (input$outcomeType == "continuous") {
        withMathJax(sprintf("$$\\sigma^2_T = %.3f, \\quad \\sigma^2_C = %.3f$$", varT, varC))
      } else {
        tagList(
          withMathJax(sprintf("$$\\text{Var}_T = p_T(1-p_T) = %.3f(1-%.3f) = %.3f$$", input$pT, input$pT, varT)),
          withMathJax(sprintf("$$\\text{Var}_C = p_C(1-p_C) = %.3f(1-%.3f) = %.3f$$", input$pC, input$pC, varC))
        )
      },
      withMathJax(sprintf("$$\\text{Combined variance} = \\frac{\\text{Var}_T}{n_T} + \\frac{\\text{Var}_C}{n_C} = \\frac{%.3f}{%.1f} + \\frac{%.3f}{%.1f} = %.4f$$",
                          varT, n_T, varC, n_C, var_term)),
      
      h5("3. Critical Values:"),
      withMathJax(sprintf("$$z_{1-\\alpha/2} = %.4f \\quad (\\text{for } \\alpha = %.3f)$$", z_alpha, input$alpha)),
      withMathJax(sprintf("$$z_{1-\\beta} = %.4f \\quad (\\text{for power } = %.3f)$$", z_beta, input$power)),
      
      h5("4. Final MDE Calculation:"),
      withMathJax("$$\\text{MDE} = (z_{1-\\alpha/2} + z_{1-\\beta}) \\sqrt{\\frac{\\text{Var}_T}{n_T} + \\frac{\\text{Var}_C}{n_C}}$$"),
      withMathJax(sprintf("$$\\text{MDE} = (%.4f + %.4f) \\sqrt{%.4f} = %.4f$$", 
                          z_alpha, z_beta, var_term, mde))
    )
  })
  
  # Render step-by-step cost allocation calculations
  output$costCalcSteps <- renderUI({
    if (input$constraintType != "cost") {
      return(p("Step-by-step calculations are shown when using cost constraints."))
    }
    
    # Get current optimal values if in optimal mode
    if (input$ratioChoice == "optimal") {
      rTest <- seq(0.1, 10, 0.01)
      mdeTest <- sapply(rTest, computeMDE_ratio)
      r <- rTest[which.min(mdeTest)]
      n_C <- input$budget / (r * input$costT + input$costC)
      n_T <- r * n_C
      total_cost <- input$costT * n_T + input$costC * n_C
      
      tagList(
        withMathJax(),
        h4("Optimal Cost Allocation:"),
        
        h5("1. Budget Constraint:"),
        withMathJax(sprintf("$$%d = %d n_T + %d n_C$$", 
                           input$budget, input$costT, input$costC)),
        
        h5("2. Optimal Allocation Ratio:"),
        withMathJax(sprintf("$$r = \\frac{n_T}{n_C} = %.3f$$", r)),
        
        h5("3. Sample Sizes:"),
        withMathJax(sprintf("$$n_C = \\frac{\\text{budget}}{rc_T + c_C} = \\frac{%d}{%.3f \\cdot %d + %d} = %.1f$$",
                           input$budget, r, input$costT, input$costC, n_C)),
        withMathJax(sprintf("$$n_T = r \\cdot n_C = %.3f \\cdot %.1f = %.1f$$", 
                           r, n_C, n_T)),
        
        h5("4. Cost Verification:"),
        withMathJax(sprintf("$$\\text{Total cost} = c_T n_T + c_C n_C = %d \\cdot %.1f + %d \\cdot %.1f = %d$$",
                           input$costT, n_T, input$costC, n_C, total_cost))
      )
    } else {
      n_C <- input$budget / (input$ratio * input$costT + input$costC)
      n_T <- input$ratio * n_C
      total_cost <- input$costT * n_T + input$costC * n_C
      
      tagList(
        withMathJax(),
        h4("Manual Cost Allocation:"),
        
        h5("1. Budget Constraint:"),
        withMathJax(sprintf("$$%d = %d n_T + %d n_C$$", 
                           input$budget, input$costT, input$costC)),
        
        h5("2. Fixed Allocation Ratio:"),
        withMathJax(sprintf("$$r = \\frac{n_T}{n_C} = %.3f$$", input$ratio)),
        
        h5("3. Sample Sizes:"),
        withMathJax(sprintf("$$n_C = \\frac{\\text{budget}}{rc_T + c_C} = \\frac{%d}{%.3f \\cdot %d + %d} = %.1f$$",
                           input$budget, input$ratio, input$costT, input$costC, n_C)),
        withMathJax(sprintf("$$n_T = r \\cdot n_C = %.3f \\cdot %.1f = %.1f$$", 
                           input$ratio, n_C, n_T)),
        
        h5("4. Cost Verification:"),
        withMathJax(sprintf("$$\\text{Total cost} = c_T n_T + c_C n_C = %d \\cdot %.1f + %d \\cdot %.1f = %d$$",
                           input$costT, n_T, input$costC, n_C, total_cost))
      )
    }
  })
}

shinyApp(ui = ui, server = server)
