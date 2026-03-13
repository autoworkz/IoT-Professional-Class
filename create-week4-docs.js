const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel, BorderStyle, WidthType, LevelFormat, ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// In-Class Activities Document
const inClassDoc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "ff6600", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 180 } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-steps",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Week 4: Marketing & Sales Planning")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 360 },
        children: [new TextRun({ text: "In-Class Activities", size: 28, color: "666666" })] }),
      new Paragraph({ children: [new TextRun({ text: "Strategic Takeaway: ", bold: true }), 
        new TextRun("\"Marketing and sales succeed when you know your customer, price for value, and execute with clear timelines.\"")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Activity Steps")] }),
      
      // Step 1
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 1: Review Your Week 3 Gap Analysis (~15 min)")] }),
      new Paragraph({ children: [new TextRun("Open your Week 3 Gap-to-Goal Action Plan. Identify the key gaps you documented:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Revenue gap", bold: true }), new TextRun(" – How much more do you need to earn?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Customer gap", bold: true }), new TextRun(" – How many more customers do you need?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Product/service gap", bold: true }), new TextRun(" – What offerings need improvement?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Geography gap", bold: true }), new TextRun(" – Where are your ideal customers located?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Team gap", bold: true }), new TextRun(" – Who do you need to help you grow?")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Key Question: ", bold: true, color: "220bb1" }), 
        new TextRun("\"Which gap, if closed, would have the biggest impact on my business in the next 90 days?\"")] }),
      
      // Step 2
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 2: Create Your Marketing & Sales Plan with AI (~25 min)")] }),
      new Paragraph({ children: [new TextRun("Use AI with RCTFC prompts to build your marketing strategy:")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Example RCTFC Prompt:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("\"You are a marketing strategist for small businesses...\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Context: ", bold: true }), new TextRun("\"My business is [type]. I need to close a $[X] revenue gap by acquiring [Y] new customers...\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Task: ", bold: true }), new TextRun("\"Create a 90-day marketing plan with 3-5 specific channels...\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Format: ", bold: true }), new TextRun("\"Present as a table with channel, budget, timeline, and expected results...\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Constraints: ", bold: true }), new TextRun("\"Budget under $[X], must reach [target audience]...\"")] }),
      
      // Step 3
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 3: Define Your Target Customer Profile (~20 min)")] }),
      new Paragraph({ children: [new TextRun("Create a detailed profile of your ideal customer using AI assistance:")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Document these key elements:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Demographics: ", bold: true }), new TextRun("Age, income, location, industry")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Behaviors: ", bold: true }), new TextRun("Where they spend time, how they buy")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Pain Points: ", bold: true }), new TextRun("What problems do they have?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Values: ", bold: true }), new TextRun("What matters most to them?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Buying Triggers: ", bold: true }), new TextRun("What motivates them to purchase?")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Key Questions:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Who has the problem my business solves?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Where do they spend time online and offline?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("What motivates them to buy?")] }),
      
      // Step 4
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 4: Set Your Pricing Strategy (~20 min)")] }),
      new Paragraph({ children: [new TextRun("Use your financial data from Week 3 to set strategic prices:")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Pricing Factors:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Cost to deliver (from Week 3 financials)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Competitor pricing")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Value delivered to customer")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Revenue gap to close")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Market positioning (premium/competitive/budget)")] }),
      
      // Step 5
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 5: Create Your 90-Day Action Plan (~20 min)")] }),
      new Paragraph({ children: [new TextRun("Build a specific, time-bound action plan with milestones:")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Action Plan Template:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Week 1-2: ", bold: true }), new TextRun("Foundation activities")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Week 3-4: ", bold: true }), new TextRun("Launch first campaign")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Month 2: ", bold: true }), new TextRun("Scale what works")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Month 3: ", bold: true }), new TextRun("Evaluate and adjust")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Success Metrics: ", bold: true }), 
        new TextRun("Define how you will measure success (leads, conversions, revenue, customer acquisition cost).")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Learning Outcomes")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Build a marketing & sales plan based on your gap analysis")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Define your target customer profile with demographics and behaviors")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Set a pricing strategy aligned with your financial goals")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Create a 90-day action plan with clear milestones")] })
    ]
  }]
});

// Homework Document
const homeworkDoc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "ff6600", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 180 } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 } } }
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
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Week 4 Homework")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 360 },
        children: [new TextRun({ text: "Marketing & Sales Action Plan", size: 28, color: "ff6600" })] }),
      new Paragraph({ children: [new TextRun("Build on your Week 3 Gap-to-Goal Action Plan to create a complete marketing and sales strategy. Define your target customer, set pricing, and develop a 90-day action plan to close your revenue gap.")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Total Points: 100", bold: true, color: "ff6600" })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Assignment Steps")] }),
      
      // Step 1
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 1: Review Your Gap Analysis")] }),
      new Paragraph({ children: [new TextRun("From your Week 3 homework, identify your key gaps:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Revenue gap: ", bold: true }), new TextRun("How much more do you need to earn?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Customer gap: ", bold: true }), new TextRun("How many more customers do you need?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Product/service gap: ", bold: true }), new TextRun("What offerings need improvement?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Geography gap: ", bold: true }), new TextRun("Where are your ideal customers?")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Upload financial documents at: ", italics: true }), new TextRun({ text: "autoworkz.org", bold: true, color: "ff6600" })] }),
      
      // Step 2
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 2: Define Your Target Customer Profile")] }),
      new Paragraph({ children: [new TextRun("Create a detailed profile of your ideal customer:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Demographics: ", bold: true }), new TextRun("Age, income, location, industry")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Behaviors: ", bold: true }), new TextRun("Where they spend time, how they buy")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Pain Points: ", bold: true }), new TextRun("What problems do they have?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Values: ", bold: true }), new TextRun("What matters most to them?")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Buying Triggers: ", bold: true }), new TextRun("What motivates them to purchase?")] }),
      
      // Step 3
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 3: Develop Your Marketing Strategy")] }),
      new Paragraph({ children: [new TextRun("Use AI with RCTFC prompts to create your marketing plan. Define:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("3-5 marketing channels to reach your target customer")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Key messages that address their pain points")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Budget allocation for each channel")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Expected results and metrics to track")] }),
      
      // Step 4
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 4: Set Your Pricing Strategy")] }),
      new Paragraph({ children: [new TextRun("Using your Week 3 financial data, document your pricing:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Cost to deliver your product/service")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Competitor pricing")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Value delivered to customer")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Your final price and justification")] }),
      
      // Step 5
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 5: Create Your 90-Day Action Plan")] }),
      new Paragraph({ children: [new TextRun("Build a timeline with specific actions:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Week 1-2: ", bold: true }), new TextRun("Foundation activities")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Week 3-4: ", bold: true }), new TextRun("Launch first campaign")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Month 2: ", bold: true }), new TextRun("Scale what works")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Month 3: ", bold: true }), new TextRun("Evaluate and adjust")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Success Metrics: ", bold: true }), new TextRun("Define how you'll measure success (leads, conversions, revenue, customer acquisition cost).")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Submission Requirements")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Submit as a Word doc, Google Doc, or PDF")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Maximum 2 pages")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Include all 5 steps")] })
    ]
  }]
});

// Quiz Document
const quizDoc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "333144", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "ff6600", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 120 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "answer-list",
        levels: [{ level: 0, format: LevelFormat.UPPER_LETTER, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Week 4 Quiz")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 360 },
        children: [new TextRun({ text: "Marketing & Sales Planning", size: 28, color: "ff6600" })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: "Total Points: 100 (10 points per question)", bold: true })] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Instructions: ", bold: true }), new TextRun("Select the best answer for each question.")] }),
      
      // Q1
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. What is the foundation for building a marketing and sales plan in Week 4?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Your Week 3 Gap-to-Goal Action Plan and financial data")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Competitor research only")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Social media trends")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Industry reports")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: A ✓", bold: true, color: "019e7c" })] }),
      
      // Q2
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Which is NOT one of the five key gaps to analyze from Week 3?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Revenue gap")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Technology gap")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Geography gap")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Customer gap")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: B ✓", bold: true, color: "019e7c" })] }),
      
      // Q3
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. What elements should be included in a Target Customer Profile?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only demographics like age and income")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only behavioral data")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Demographics, behaviors, pain points, values, and buying triggers")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only competitor information")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: C ✓", bold: true, color: "019e7c" })] }),
      
      // Q4
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. What factors should you consider when setting your pricing strategy?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Cost to deliver, competitor pricing, value to customer, and revenue gap")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only what competitors charge")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only your costs")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("What feels right")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: A ✓", bold: true, color: "019e7c" })] }),
      
      // Q5
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. How should you structure a 90-day marketing action plan?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Do everything in the first week")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Foundation, launch, scale, and evaluate phases across the 90 days")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Wait until the last week to start")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only plan the first month")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: B ✓", bold: true, color: "019e7c" })] }),
      
      // Q6
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. What is the key question to ask when prioritizing which gap to close first?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Which gap is easiest to close?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Which gap requires the least money?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Which gap would have the biggest impact in the next 90 days?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Which gap is mentioned most in industry news?")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: C ✓", bold: true, color: "019e7c" })] }),
      
      // Q7
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. What success metrics should you track for your marketing plan?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only social media followers")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only website traffic")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Only revenue")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Leads, conversions, revenue, and customer acquisition cost")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: D ✓", bold: true, color: "019e7c" })] }),
      
      // Q8
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. How can AI help you create a marketing strategy using RCTFC prompts?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("AI will automatically implement your marketing")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("AI can generate marketing channel recommendations, messaging, and budget allocation based on your gap analysis")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("AI replaces the need to understand your customers")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("AI guarantees marketing success")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: B ✓", bold: true, color: "019e7c" })] }),
      
      // Q9
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. What is a \"buying trigger\" in a customer profile?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("What customers buy most often")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("How much customers spend")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("What motivates a customer to make a purchase decision")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Where customers shop")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: C ✓", bold: true, color: "019e7c" })] }),
      
      // Q10
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. Where should you upload your financial documents for this class?")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("autoworkz.org")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("SenseiiWyze")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("GitHub")] }),
      new Paragraph({ numbering: { reference: "answer-list", level: 0 }, children: [new TextRun("Google Drive")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Correct Answer: A ✓", bold: true, color: "019e7c" })] })
    ]
  }]
});

// Save all documents
const docsDir = "/mnt/c/Users/miran/Automation Workz Dropbox/Miranda's Workspace/Miranda Boyd/IoT Professional Class/documents";
Packer.toBuffer(inClassDoc).then(buffer => { fs.writeFileSync(`${docsDir}/Week4_InClassActivities.docx`, buffer); console.log("Created Week4_InClassActivities.docx"); });
Packer.toBuffer(homeworkDoc).then(buffer => { fs.writeFileSync(`${docsDir}/Week4_Homework.docx`, buffer); console.log("Created Week4_Homework.docx"); });
Packer.toBuffer(quizDoc).then(buffer => { fs.writeFileSync(`${docsDir}/Week4_Quiz.docx`, buffer); console.log("Created Week4_Quiz.docx"); });
