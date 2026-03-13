const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType, 
        VerticalAlign, HeadingLevel, ImageRun } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };
const headerShading = { fill: "FF6600", type: ShadingType.CLEAR };
const altRowShading = { fill: "F5F5F5", type: ShadingType.CLEAR };

const basePath = "/mnt/c/Users/miran/Automation Workz Dropbox/Miranda's Workspace/Miranda Boyd/IoT Professional Class/";
const inClassImage = fs.readFileSync(basePath + "images/Gemini_Generated_Image_gtk2mbgtk2mbgtk2.png");
const homeworkImage = fs.readFileSync(basePath + "images/Week 3 homework page.png");

// Document 1: In-Class Activities
const inClassDoc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "FF6600", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Week 3: In-Class Activities")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "Financial Gap Analysis & Business Planning", size: 28, color: "666666" })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new ImageRun({ type: "png", data: inClassImage, transformation: { width: 500, height: 300 }, altText: { title: "Financial Gap Analysis", description: "Week 3 In-Class", name: "inclass" } })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Theme: From Vision to Reality")] }),
      
      new Paragraph({ shading: { fill: "FFF3E6", type: ShadingType.CLEAR }, spacing: { after: 200 },
        children: [new TextRun({ text: "Strategic Takeaway: ", bold: true, color: "FF6600" }),
                   new TextRun({ text: '"A gap analysis without financial data is just a wish list. When you connect your vision to your numbers, you create a roadmap that can actually be executed."', italics: true })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Learning Outcomes")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Upload and analyze financial statements (Income Statement, Balance Sheet, Cash Flow)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Connect financial data to Week 2 Vision Board")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Identify specific gaps between current state and goals")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Create a Gap-to-Goal Action Plan")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Use autoworkz.org for financial analysis")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Week 2 Recap: Your 3 Data Points")] }),
      new Paragraph({ children: [new TextRun("Today we add the fourth data point: Your Financial Reality.")] }),

      new Table({
        columnWidths: [3120, 3120, 3120],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: headerShading, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OCEAN Profile", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: headerShading, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vision Board", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: headerShading, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tech Readiness", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Who you are naturally", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Where you want to go", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "How ready you are for change", size: 20 })] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("In-Class Activity Steps")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 1: Prepare Your Financial Documents (~15 min)")] }),
      new Paragraph({ children: [new TextRun("Gather your three key financial statements:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Income Statement (P&L)", bold: true }), new TextRun(" - Revenue, expenses, profit/loss")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Balance Sheet", bold: true }), new TextRun(" - Assets, liabilities, equity")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Cash Flow Statement", bold: true }), new TextRun(" - Money in/out over time")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 2: Upload Financials to autoworkz.org (~25 min)")] }),
      new Paragraph({ children: [new TextRun("Log into autoworkz.org and upload your financial documents. The platform will analyze your financial health and identify key metrics.")] }),
      new Paragraph({ shading: { fill: "FFF9E6", type: ShadingType.CLEAR }, children: [new TextRun({ text: "Note: ", bold: true }), new TextRun("Your financial data is private and secure.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 3: Map Financial Reality to Your Vision (~20 min)")] }),
      new Paragraph({ children: [new TextRun("Compare your financial analysis with your Week 2 Vision Board. Identify specific gaps:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Revenue Gap: ", bold: true }), new TextRun("Current revenue vs. your target?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Customer Gap: ", bold: true }), new TextRun("Current customers vs. ideal customer profile?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Resource Gap: ", bold: true }), new TextRun("Do you have the funds to hire/expand?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Time Gap: ", bold: true }), new TextRun("How long to reach your financial goals?")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 4: Create Your Gap-to-Goal Action Plan (~30 min)")] }),
      new Paragraph({ children: [new TextRun("Using AI assistance, create a concrete action plan to close each gap:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Current State: ", bold: true }), new TextRun("Where you are now (from financials)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Goal State: ", bold: true }), new TextRun("Where you want to be (from vision)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Gap: ", bold: true }), new TextRun("The difference (measured in $, time, or resources)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Actions: ", bold: true }), new TextRun("3-5 specific steps to close each gap")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Timeline: ", bold: true }), new TextRun("When will each action be completed?")] }),

      new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Automation Workz | IoT Professional Class", size: 20, color: "666666" })] })
    ]
  }]
});

// Document 2: Homework
const homeworkDoc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "FF6600", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "checklist",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Week 3: Homework Assignment")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new TextRun({ text: "Gap-to-Goal Action Plan", size: 28, color: "666666" })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new ImageRun({ type: "png", data: homeworkImage, transformation: { width: 500, height: 300 }, altText: { title: "Week 3 Homework", description: "Gap-to-Goal Action Plan", name: "homework" } })] }),

      new Paragraph({ shading: { fill: "E6F7F1", type: ShadingType.CLEAR }, spacing: { after: 200 },
        children: [new TextRun({ text: "Total Points: 100", bold: true, color: "019E7C" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Part 1: Document Your Financial Reality (40 points)")] }),
      new Paragraph({ children: [new TextRun("Upload your financial statements to autoworkz.org and document key findings.")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Required Financial Statements:")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Income Statement (P&L)", bold: true }), new TextRun(" - Revenue, expenses, profit/loss")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Balance Sheet", bold: true }), new TextRun(" - Assets, liabilities, equity")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Cash Flow Statement", bold: true }), new TextRun(" - Money in/out over time")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What to Document:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Current monthly/annual revenue")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Top 3 expense categories")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Current profit margin (if known)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Cash flow status (positive/negative)")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Part 2: Gap Analysis Worksheet (30 points)")] }),
      new Paragraph({ children: [new TextRun("Complete the gap analysis for each of your Week 2 vision elements.")] }),

      new Table({
        columnWidths: [2340, 2340, 2340, 2340],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: headerShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Vision Element", bold: true, color: "FFFFFF", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: headerShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Current State", bold: true, color: "FFFFFF", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: headerShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Goal State", bold: true, color: "FFFFFF", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: headerShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Gap", bold: true, color: "FFFFFF", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Revenue", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "$_____/year", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "$_____/year", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "$_____ gap", size: 20, color: "FF6600" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Customer Type", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Current customers", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Ideal customers", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Describe gap", size: 20, color: "FF6600" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Product/Service", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Current offerings", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "New/expansion", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Describe gap", size: 20, color: "FF6600" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Geography", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Current markets", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "New markets", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, shading: altRowShading, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Describe gap", size: 20, color: "FF6600" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Team/Salary", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Current team/budget", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Needed team/comp", size: 20, color: "666666" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Describe gap", size: 20, color: "FF6600" })] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Part 3: Action Plan - Top 3 Gaps (30 points)")] }),
      new Paragraph({ children: [new TextRun("For your top 3 gaps, answer the following:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("What specific actions will close this gap?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("What resources (money, time, people) are needed?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("What is your timeline for completion?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("How will you measure success?")] }),

      new Paragraph({ shading: { fill: "FFF9E6", type: ShadingType.CLEAR }, spacing: { before: 200 },
        children: [new TextRun({ text: "Use AI to help: ", bold: true }), new TextRun({ text: 'Copy your gap analysis into ChatGPT, Claude, or Perplexity and ask: "Based on my gap analysis, suggest 3-5 specific action steps to close each gap with realistic timelines."', italics: true })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Submission Requirements")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Submit as Word doc, Google Doc, or PDF")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Maximum 2 pages")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Include all 3 parts completed")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Screenshots of autoworkz.org analysis (optional but recommended)")] }),

      new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Automation Workz | IoT Professional Class", size: 20, color: "666666" })] })
    ]
  }]
});

// Document 3: Quiz
const quizDoc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } }
    ]
  },
  numbering: {
    config: [
      { reference: "quiz-options",
        levels: [{ level: 0, format: LevelFormat.LOWER_LETTER, text: "%1)", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Week 3 Quiz")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new TextRun({ text: "Financial Gap Analysis & Business Planning", size: 28, color: "666666" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, shading: { fill: "FFF3E6", type: ShadingType.CLEAR }, spacing: { after: 200 },
        children: [new TextRun({ text: "Total Points: 100 (10 points each)", bold: true, color: "FF6600" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, shading: { fill: "E6F7F1", type: ShadingType.CLEAR }, spacing: { after: 400 },
        children: [new TextRun({ text: "Correct answers are marked with ✓", bold: true, color: "019E7C" })] }),

      // Q1
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "1. What are the three key financial statements needed for a complete financial analysis?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Bank Statement, Tax Return, Invoice")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Budget, Forecast, Projection")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "Income Statement, Balance Sheet, Cash Flow Statement ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Revenue Report, Expense Report, Profit Report")] }),

      // Q2
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "2. What does an Income Statement (P&L) show?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "Revenue, expenses, and profit/loss over a period of time ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Assets, liabilities, and equity at a specific point in time")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Cash moving in and out of the business")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Customer payment history and invoices")] }),

      // Q3
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "3. What is the purpose of a Gap Analysis?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("To calculate your total tax liability")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "To identify the difference between your current state and your goal state ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("To compare your business to competitors")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("To create a marketing strategy")] }),

      // Q4
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "4. What does a Balance Sheet show?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Monthly revenue trends")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Cash flowing in and out")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "Assets, liabilities, and equity at a specific point in time ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Projected future earnings")] }),

      // Q5
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "5. What is a \"Revenue Gap\"?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "The difference between your current revenue and your target revenue ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Money lost from unpaid invoices")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("The gap between expenses and revenue")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Missing revenue data in financial records")] }),

      // Q6
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "6. What should a Gap-to-Goal Action Plan include?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Only the goal state and wish list")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "Current state, goal state, gap measurement, actions, and timeline ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Just financial projections for next year")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Only the problems to fix")] }),

      // Q7
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "7. How do the Week 2 data points (OCEAN, Vision Board, Tech Readiness) connect to financial analysis?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "They provide context for what gaps to prioritize and how to approach them ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("They are completely separate from financial analysis")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Only Vision Board is relevant to financial analysis")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Financial analysis replaces the need for OCEAN and Vision Board")] }),

      // Q8
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "8. What does a Cash Flow Statement track?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Only bank deposits")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Profit margins over time")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "Money moving in and out of the business over time ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Asset depreciation")] }),

      // Q9
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "9. Why is it important to measure gaps in specific terms ($, time, resources)?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("To impress investors with detailed reports")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "Vague goals lead to vague results—specific measurements enable actionable plans ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Only financial institutions require measurements")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Measurements are only needed for tax purposes")] }),

      // Q10
      new Paragraph({ shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, spacing: { before: 200 }, children: [new TextRun({ text: "10. What is a \"Resource Gap\"?", bold: true })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun({ text: "Whether you have the funds, people, or equipment needed to reach your goals ✓", bold: true, color: "019E7C" })] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Missing office supplies")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Unused inventory taking up space")] }),
      new Paragraph({ numbering: { reference: "quiz-options", level: 0 }, children: [new TextRun("Time spent on non-productive activities")] }),

      new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Automation Workz | IoT Professional Class", size: 20, color: "666666" })] })
    ]
  }]
});

// Save all documents
const docsPath = basePath + "documents/";

Packer.toBuffer(inClassDoc).then(buffer => {
  fs.writeFileSync(docsPath + "Week3_InClassActivities.docx", buffer);
  console.log("Created Week3_InClassActivities.docx with image");
});

Packer.toBuffer(homeworkDoc).then(buffer => {
  fs.writeFileSync(docsPath + "Week3_Homework.docx", buffer);
  console.log("Created Week3_Homework.docx with image");
});

Packer.toBuffer(quizDoc).then(buffer => {
  fs.writeFileSync(docsPath + "Week3_Quiz.docx", buffer);
  console.log("Created Week3_Quiz.docx");
});
