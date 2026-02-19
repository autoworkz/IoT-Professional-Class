const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const BRAND = {
  orange: 'ff6600',
  darkBlue: '0f0568',
  mediumBlue: '220bb1',
  white: 'ffffff',
  lightGray: 'f5f5f5',
  text: '333333'
};

const workDir = '/mnt/c/Users/miran/Automation Workz Dropbox/Miranda\'s Workspace/Miranda Boyd/IoT Professional Class/presentations';

function addTitleSlide(pptx, weekNum, theme, tagline) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.darkBlue };
  
  slide.addText(`WEEK ${weekNum}`, {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 14, color: BRAND.white,
    fill: { color: BRAND.orange },
    align: 'center', valign: 'middle',
    bold: true
  });
  
  slide.addText(theme, {
    x: 0.5, y: 2.2, w: 9, h: 0.8,
    fontSize: 36, color: BRAND.white,
    align: 'center', valign: 'middle',
    bold: true
  });
  
  slide.addText(tagline, {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, color: BRAND.orange,
    align: 'center', valign: 'middle',
    italic: true
  });
}

function addActivitySlide(pptx, weekNum, activityNum, title, time, steps) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  
  // Header bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1,
    fill: { color: BRAND.darkBlue }
  });
  
  // Orange accent bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0.2, w: 0.1, h: 0.6,
    fill: { color: BRAND.orange }
  });
  
  // Title
  slide.addText(`Week ${weekNum}: Activity ${activityNum}`, {
    x: 0.3, y: 0.15, w: 9, h: 0.4,
    fontSize: 20, color: BRAND.white, bold: true
  });
  
  slide.addText(title, {
    x: 0.3, y: 0.55, w: 9, h: 0.35,
    fontSize: 14, color: BRAND.orange
  });
  
  // Activity title
  slide.addText(title, {
    x: 0.5, y: 1.2, w: 9, h: 0.5,
    fontSize: 24, color: BRAND.darkBlue, bold: true
  });
  
  // Steps
  const stepsText = steps.map(s => ({
    text: s,
    options: { bullet: { type: 'bullet' }, indentLevel: s.startsWith('  ') ? 1 : 0 }
  }));
  
  slide.addText(stepsText, {
    x: 0.5, y: 1.8, w: 8.5, h: 3,
    fontSize: 16, color: BRAND.text,
    valign: 'top'
  });
  
  // Time box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.8, w: 1.5, h: 0.4,
    fill: { color: BRAND.orange },
    rectRadius: 0.05
  });
  
  slide.addText(time, {
    x: 0.5, y: 4.8, w: 1.5, h: 0.4,
    fontSize: 12, color: BRAND.white,
    align: 'center', valign: 'middle', bold: true
  });
}

function addTakeawaySlide(pptx, weekNum, takeaway) {
  const slide = pptx.addSlide();
  slide.background = { color: BRAND.white };
  
  // Header bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1,
    fill: { color: BRAND.darkBlue }
  });
  
  // Orange accent bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0.2, w: 0.1, h: 0.6,
    fill: { color: BRAND.orange }
  });
  
  slide.addText(`Week ${weekNum}: Key Takeaway`, {
    x: 0.3, y: 0.15, w: 9, h: 0.4,
    fontSize: 20, color: BRAND.white, bold: true
  });
  
  slide.addText('Strategic Takeaway', {
    x: 0.3, y: 0.55, w: 9, h: 0.35,
    fontSize: 14, color: BRAND.orange
  });
  
  // Quote box
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 9, h: 2.5,
    fill: { color: BRAND.lightGray },
    line: { color: BRAND.orange, width: 0, dashType: 'solid' }
  });
  
  // Orange left border
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 0.08, h: 2.5,
    fill: { color: BRAND.orange }
  });
  
  slide.addText(`"${takeaway}"`, {
    x: 0.8, y: 1.8, w: 8.4, h: 2,
    fontSize: 20, color: BRAND.darkBlue,
    italic: true, valign: 'middle'
  });
}

async function createWeekPresentation(weekNum, weekData) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = `Week ${weekNum}: ${weekData.theme}`;
  pptx.author = 'Miranda Boyd - Automation Workz';
  pptx.subject = 'AI Whisperer Professional Course';
  
  // Title slide
  addTitleSlide(pptx, weekNum, weekData.theme, weekData.tagline);
  
  // Activity slides
  for (let i = 0; i < weekData.activities.length; i++) {
    const act = weekData.activities[i];
    addActivitySlide(pptx, weekNum, i + 1, act.title, act.time, act.steps);
  }
  
  // Takeaway slide
  addTakeawaySlide(pptx, weekNum, weekData.takeaway);
  
  const outFile = path.join(workDir, `Week${weekNum}_InClassActivities.pptx`);
  await pptx.writeFile({ fileName: outFile });
  console.log(`Created: Week${weekNum}_InClassActivities.pptx`);
}

async function main() {
  const weeks = {
    1: {
      theme: 'Data, AI & You',
      tagline: '"Data as the New Gold & AI as the Data Specialist"',
      takeaway: 'Small businesses that win are not the ones with the most technology, but the ones who ask better questions of their data.',
      activities: [
        {
          title: 'Access SenseiiWyze',
          time: '10 minutes',
          steps: [
            'Log in to the SenseiiWyze platform',
            'Navigate to the assessment section',
            'Prepare for your data exploration journey'
          ]
        },
        {
          title: 'Complete Big 5 (OCEAN) Assessment',
          time: '20 minutes',
          steps: [
            'Take the personality assessment honestly',
            'Openness: Creativity, curiosity, willingness to try new things',
            'Conscientiousness: Organization, reliability, follow-through',
            'Extraversion: Social energy, assertiveness, communication',
            'Agreeableness: Cooperation, trust, helpfulness',
            'Neuroticism: Emotional sensitivity, stress response'
          ]
        },
        {
          title: 'Review Results Privately',
          time: '15 minutes',
          steps: [
            'Analyze your results within the app',
            'Identify your dominant traits',
            'Consider how these traits affect your business decisions',
            'Note any surprises or insights'
          ]
        }
      ]
    },
    2: {
      theme: 'Senseii Games Challenge',
      tagline: '"Mastering Problem Solving through Gamification"',
      takeaway: 'The quality of your output is determined by the quality of your input. Treat AI as a partner, not a search engine.',
      activities: [
        {
          title: 'Access Senseii Games',
          time: '5 minutes',
          steps: [
            'Go to senseiigames.com',
            'Create an account or log in',
            'Familiarize yourself with the interface'
          ]
        },
        {
          title: 'Complete Maze Levels 1-5',
          time: '30 minutes',
          steps: [
            'Work through each maze level sequentially',
            'Pay attention to patterns and dead ends',
            'Build problem-solving skills and resilience',
            'Note your strategies for each level'
          ]
        },
        {
          title: 'Track Your Progress',
          time: '10 minutes',
          steps: [
            'Record your completion time for each level',
            'Note the number of attempts per level',
            'Identify which strategies worked best',
            'Prepare for homework challenges (Levels 1-9)'
          ]
        }
      ]
    },
    3: {
      theme: 'Prompt Engineering Mastery',
      tagline: '"Master the prompt, master the result."',
      takeaway: 'The quality of your AI output is directly proportional to the quality of your input.',
      activities: [
        {
          title: 'RCTFC Framework Demo',
          time: '20 minutes',
          steps: [
            'Role: The persona or expertise to adopt',
            'Context: Background information about your situation',
            'Task: Specific action you want AI to perform',
            'Format: How the output should be structured',
            'Constraints: Limitations or rules to apply',
            'Watch the instructor transform a vague prompt into a powerful one'
          ]
        },
        {
          title: 'Prompt Engineering Lab',
          time: '30 minutes',
          steps: [
            'Use your problem from Senseii Games (Week 2)',
            'Craft a RCTFC prompt to address it',
            'Test on ChatGPT, Claude, and Perplexity',
            'Compare the three responses'
          ]
        },
        {
          title: 'Compare & Refine',
          time: '25 minutes',
          steps: [
            'Analyze the three AI responses',
            'Which AI gave the best answer for your need?',
            'Identify what made one response better',
            'Refine your prompt and run again'
          ]
        },
        {
          title: 'Build Your Prompt Library',
          time: '15 minutes',
          steps: [
            'Start a personal "Prompt Library" document',
            'Create template starters for different categories',
            'Business: "You are a [role] helping a [business type]..."',
            'Personal: "Act as my personal [coach/advisor]..."',
            'Research: "Find and summarize [topic] with sources..."'
          ]
        }
      ]
    },
    4: {
      theme: 'AI for Business Goals',
      tagline: '"From Chaos to Clarity: Using AI to Solve Real Business Problems"',
      takeaway: 'The best AI solution is the one that actually gets used—start with the problem, not the tool.',
      activities: [
        {
          title: 'Business Problem Identification Workshop',
          time: '15 minutes',
          steps: [
            'Identify 3 pain points in your business',
            'Select one problem that is:',
            '  Specific enough to solve',
            '  Important enough to matter',
            '  Within your control to address',
            'Write a clear problem statement'
          ]
        },
        {
          title: 'RCTFC Prompt Crafting for Business',
          time: '25 minutes',
          steps: [
            'Transform your problem into an RCTFC prompt',
            'Role: "You are a business operations consultant..."',
            'Context: "I run a [business type] with [challenge]..."',
            'Task: "Recommend 3 actionable solutions..."',
            'Format: "Present as numbered list with pros/cons..."',
            'Constraints: "Solutions under $500, under 2 weeks..."'
          ]
        },
        {
          title: 'OpenCode Demo: Build a Simple Tool',
          time: '30 minutes',
          steps: [
            'Introduction to OpenCode as a coding assistant',
            'Watch demo: Creating a simple business tool',
            'Examples: Customer follow-up tracker, inventory calculator',
            'Key concepts: Describe in plain language, iterate, test'
          ]
        },
        {
          title: 'Peer Review & Refinement',
          time: '20 minutes',
          steps: [
            'Share your RCTFC prompt with a partner',
            'Provide feedback on clarity and completeness',
            'Identify what could be improved',
            'Refine your prompt based on feedback'
          ]
        }
      ]
    },
    5: {
      theme: 'AI for Marketing Forecasting',
      tagline: '"Your Data Has a Story: Using AI to Predict What\'s Next"',
      takeaway: 'The best predictor of future success is understanding your past patterns—AI helps you see what you\'ve been missing.',
      activities: [
        {
          title: 'Data Audit: What Data Do You Have?',
          time: '15 minutes',
          steps: [
            'Inventory your existing business data:',
            '  Sales records',
            '  Customer lists',
            '  Marketing campaign results',
            '  Website/social media analytics',
            'Identify which data is most relevant for forecasting'
          ]
        },
        {
          title: 'Export & Prep: Formatting Excel for AI',
          time: '20 minutes',
          steps: [
            'Export data from your systems (CRM, POS, spreadsheets)',
            'Clean and format for AI analysis:',
            '  Remove duplicates and errors',
            '  Ensure consistent date formats',
            '  Label columns clearly',
            'Best practices for data structure'
          ]
        },
        {
          title: 'AI Forecasting Lab: Upload, Analyze, Predict',
          time: '35 minutes',
          steps: [
            'Upload your Excel file to ChatGPT or Claude',
            'Use RCTFC prompt structure for forecasting',
            'Role: "You are a marketing analytics expert..."',
            'Task: "Analyze trends and forecast [metric] for 3 months..."',
            'Document the AI\'s analysis and predictions'
          ]
        },
        {
          title: 'Strategy Translation: From Forecast to Action',
          time: '20 minutes',
          steps: [
            'Review AI-generated insights',
            'Identify 3 actionable marketing decisions:',
            '  What to increase',
            '  What to decrease',
            '  What to test',
            'Share one insight with the class'
          ]
        }
      ]
    },
    6: {
      theme: 'Automation & Workflows',
      tagline: '"Set It and Forget It: Building AI-Powered Automation"',
      takeaway: 'The best time you spend is the time you never have to spend again—automate what you can.',
      activities: [
        {
          title: 'Automation Opportunity Audit',
          time: '15 minutes',
          steps: [
            'List 10 tasks you do repeatedly',
            'Categorize each task:',
            '  Daily, weekly, or monthly frequency',
            '  High, medium, or low complexity',
            '  High, medium, or low value',
            'Identify top 3 automation candidates'
          ]
        },
        {
          title: 'Workflow Mapping Exercise',
          time: '20 minutes',
          steps: [
            'For your top automation candidate, map the workflow:',
            'Trigger: What starts the process?',
            'Steps: What actions happen in sequence?',
            'Output: What is the end result?',
            'Draw a simple flowchart',
            'Identify decision points and exceptions'
          ]
        },
        {
          title: 'Build Your First Automation with OpenCode',
          time: '35 minutes',
          steps: [
            'OpenCode demo: Generating an automation script',
            'Prompt structure for automation:',
            'Role: "You are an automation engineer..."',
            'Context: "I need to automate [task] when [trigger]..."',
            'Task: "Write a script/approach that..."',
            'Test the generated solution and iterate'
          ]
        },
        {
          title: 'Test & Troubleshoot',
          time: '20 minutes',
          steps: [
            'Run your automation',
            'Identify what works and what doesn\'t',
            'Debug common issues:',
            '  Trigger not firing',
            '  Data not passing correctly',
            '  Output format issues',
            'Document your solution'
          ]
        }
      ]
    },
    7: {
      theme: 'Final Project Development',
      tagline: '"Bring It All Together: Your AI-Powered Solution"',
      takeaway: 'The true test of learning is creation—build something that solves a real problem.',
      activities: [
        {
          title: 'Project Scope Definition',
          time: '20 minutes',
          steps: [
            'Define your capstone project:',
            'Problem: What are you solving?',
            'Approach: Which AI tools/frameworks will you use?',
            'Outcome: What does success look like?',
            'Write a one-paragraph project summary',
            'Get instructor approval'
          ]
        },
        {
          title: 'Design Sprint: Plan Your Solution',
          time: '25 minutes',
          steps: [
            'Create a project plan with:',
            '  Problem statement',
            '  RCTFC prompts needed',
            '  Data requirements (if any)',
            '  Automation opportunities (if any)',
            '  Timeline and milestones',
            'Sketch the solution architecture'
          ]
        },
        {
          title: 'Build Session: Hands-On Development',
          time: '35 minutes',
          steps: [
            'Start building your solution:',
            '  Test prompts in ChatGPT/Claude/Perplexity',
            '  Use OpenCode for any coding needs',
            '  Document your process',
            'Instructor available for guidance'
          ]
        },
        {
          title: 'Peer Feedback & Iteration',
          time: '10 minutes',
          steps: [
            'Share your project plan with a partner',
            'Receive feedback on clarity and feasibility',
            'Adjust scope if needed',
            'Prepare for final presentation'
          ]
        }
      ]
    },
    8: {
      theme: 'Final Presentations',
      tagline: '"Showcase Your Mastery: From Learner to AI Whisperer"',
      takeaway: 'Teaching others what you\'ve learned is the ultimate proof of mastery.',
      activities: [
        {
          title: 'Final Presentations',
          time: '60 minutes',
          steps: [
            'Each student presents for 5 minutes',
            'Presentation format:',
            '  Problem you solved',
            '  Tools and approach used',
            '  Solution and results',
            '  Lessons learned',
            '2-minute Q&A after each presentation'
          ]
        },
        {
          title: 'Peer Feedback',
          time: '15 minutes',
          steps: [
            'Provide constructive feedback to classmates',
            'Vote on categories:',
            '  Most innovative solution',
            '  Best presentation',
            '  Most practical application'
          ]
        },
        {
          title: 'Course Reflection',
          time: '10 minutes',
          steps: [
            'What did you learn about yourself?',
            'How will you use AI differently going forward?',
            'What would you like to learn next?',
            'Complete the course reflection form'
          ]
        },
        {
          title: 'Bonus Preview: Agent Swarms',
          time: '5 minutes',
          steps: [
            'Introduction to multi-agent AI systems',
            'How AI agents can work together',
            'Future applications and possibilities',
            'Preview of advanced AI concepts'
          ]
        }
      ]
    }
  };

  for (const [weekNum, weekData] of Object.entries(weeks)) {
    await createWeekPresentation(parseInt(weekNum), weekData);
  }

  console.log('\nAll 8 presentations created successfully!');
}

main().catch(console.error);
