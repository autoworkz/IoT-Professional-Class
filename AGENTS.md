# IoT Professional Class - Project Instructions

## Document Standards

All generated .docx files MUST include:

### Header (every page)
- Company logo centered (1.5" width)
- Logo file: `documents/AWI_Letterhead.docx` (contains image)

### Footer (every page)
- Contact info centered: "440 Burroughs St. Ste. 173, Detroit, MI 48202 | 313-483-2126 | ida@autoworkz.org"

### Python template for new documents:
```python
from docx import Document
from docx.shared import Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH

# Extract logo from: documents/AWI_Letterhead.docx (word/media/image1.png)
LETTERHEAD_IMG = "/tmp/letterhead_unpacked/word/media/image1.png"

def add_letterhead(doc, logo_path):
    section = doc.sections[0]
    
    # Header
    header = section.header
    header_para = header.paragraphs[0] if header.paragraphs else header.add_paragraph()
    header_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = header_para.add_run()
    run.add_picture(logo_path, width=Inches(1.5))
    
    # Footer
    footer = section.footer
    footer_para = footer.paragraphs[0] if footer.paragraphs else footer.add_paragraph()
    footer_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer_para.add_run("440 Burroughs St. Ste. 173, Detroit, MI 48202 | 313-483-2126 | ida@autoworkz.org")
    
    return doc
```

## Project Structure

- `documents/` - All .docx files organized by week
- `images/` - Images for web pages
- `weekN.html`, `homeworkN.html`, `quizN.html` - Weekly web pages
- `curriculum/` - Markdown curriculum files

## Deployment

GitHub Pages: https://autoworkz.github.io/IoT-Professional-Class/
