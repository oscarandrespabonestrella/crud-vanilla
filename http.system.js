
export default class HttpService {    
    get(url){
        return new Promise((resolve, reject) => {
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = function () {
                if (xml.readyState !== 4) return;
                if (xml.status >= 200 && xml.status < 300) {
                    resolve(JSON.parse(xml.responseText))
                } else {                
                    reject(xml.statusText);
                }
            };
            xml.open("GET", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send();
        })
    }
}

