document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;

    if (name.length > 19) {
        alert('Le nom doit contenir au maximum 19 caractères.');
        return;
    }

    // Load the pptxgenjs library
    if (typeof PptxGenJS === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.4.0/pptxgen.bundle.js';
        script.onload = () => modifyPowerPoint(name);
        document.head.appendChild(script);
    } else {
        modifyPowerPoint(name);
    }
});

function modifyPowerPoint(name) {
    const pptx = new PptxGenJS();

    // Load the template file (this requires a server-side script to read the template and send it to the client)
    fetch('template.pptx')
        .then(response => response.arrayBuffer())
        .then(buffer => {
            pptx.load(buffer);
            // Assuming the "NOM" placeholder is in the first slide, first shape
            let slide = pptx.getSlide(0);
            let textShape = slide.getTextShapes()[0];
            textShape.setText(name);

            // Download the modified file
            pptx.save(`${name.slice(0, 19)}.pptx`);
        })
        .catch(error => console.error('Error loading template:', error));
}
