const list = document.getElementById("result")

function uploadImage() {
    var formData = new FormData(document.getElementById("uploadForm"));

    fetch("https://ocr.asprise.com/api/v1/receipt", {
        method: "POST",
        body: formData

    })
    .then(response => response.json())
    .then(json => { 

    list.innerHTML = `${json.receipts[0].ocr_text}`
    console.log.json        
        
    })
    .catch(error => console.error('Error:', error));

}
 
