
var r = /\/post\/[a-zA-Z]+/.test(window.location.pathname)
if (r) {
    (function(){
        var utterances = document.createElement('script');
        utterances.type = 'text/javascript';
        utterances.async = true;
        utterances.setAttribute('issue-term','pathname')
        utterances.setAttribute('theme','github-light')
        utterances.setAttribute('repo','dongdongdoge/utterances')
        utterances.crossorigin = 'anonymous';
        utterances.src = 'https://utteranc.es/client.js';
        document.body.appendChild(utterances);
    })();
}



