const pptxgen = require('pptxgenjs');
const html2pptx = require('/home/miran/.agents/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Automation Workz';
    pptx.title = 'Week 2 - Business Vision Board & Technical Skills Assessment';

    const slidesDir = '/mnt/c/Users/miran/Automation Workz Dropbox/Miranda\'s Workspace/Miranda Boyd/IoT Professional Class/presentations/week2_slides';

    const slides = [
        'slide1_title.html',
        'slide2_objectives.html',
        'slide3_activity1.html',
        'slide4_elements.html',
        'slide5_activity2.html',
        'slide6_tech_why.html',
        'slide7_data_points.html',
        'slide8_gaps.html',
        'slide9_takeaway.html'
    ];

    for (const slideFile of slides) {
        const slidePath = path.join(slidesDir, slideFile);
        console.log(`Processing: ${slideFile}`);
        try {
            await html2pptx(slidePath, pptx);
        } catch (err) {
            console.error(`Error processing ${slideFile}:`, err.message);
        }
    }

    const outputPath = '/mnt/c/Users/miran/Automation Workz Dropbox/Miranda\'s Workspace/Miranda Boyd/IoT Professional Class/presentations/Week2_InClassActivities_Aligned.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
}

createPresentation().catch(console.error);
