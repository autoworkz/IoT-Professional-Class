const pptxgen = require('pptxgenjs');
const html2pptx = require('/home/miran/.agents/skills/pptx/scripts/html2pptx');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'IoT Professional Class';
    pptx.title = 'Week 2: Business Vision & Tech Readiness';
    
    const slidesDir = '/mnt/c/Users/miran/Automation Workz Dropbox/Miranda\'s Workspace/Miranda Boyd/IoT Professional Class/presentations/workspace/week2_slides';
    
    const slides = [
        'slide01_title.html',
        'slide02_outcomes.html',
        'slide03_activity1.html',
        'slide04_elements.html',
        'slide05_activity2.html',
        'slide06_tech_ready.html',
        'slide07_3datapoints.html',
        'slide08_business_vision.html',
        'slide09_gaps.html',
        'slide10_takeaway.html'
    ];
    
    for (const slideFile of slides) {
        const htmlPath = path.join(slidesDir, slideFile);
        console.log(`Processing: ${slideFile}`);
        await html2pptx(htmlPath, pptx);
    }
    
    const outputPath = '/mnt/c/Users/miran/Automation Workz Dropbox/Miranda\'s Workspace/Miranda Boyd/IoT Professional Class/presentations/Week2_InClassActivities_Aligned.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation created: ${outputPath}`);
}

createPresentation().catch(console.error);
