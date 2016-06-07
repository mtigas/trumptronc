function getStyle(el,styleProp)
{
    var x = document.getElementById(el);
    if (!x)
      return null;
    if (x.currentStyle)
        var y = x.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
    return y;
}
function calculateLineHeight (element) {

  var lineHeight = parseInt(getStyle(element, 'line-height'), 10);
  var clone;
  var singleLineHeight;
  var doubleLineHeight;

  if (isNaN(lineHeight)) {
    clone = element.cloneNode();
    clone.innerHTML = '<br>';
    element.appendChild(clone);
    singleLineHeight = clone.offsetHeight;
    clone.innerHTML = '<br><br>';
    doubleLineHeight = clone.offsetHeight;
    element.removeChild(clone);
    lineHeight = doubleLineHeight - singleLineHeight;
  }

  return lineHeight;
}

function troncIt() {
    var fancyChance = 1/12;

    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                if (Math.random() <= fancyChance) {
                    var eleHeight = calculateLineHeight(element)*17/23;
                    /*var fancy = document.createElement('img');
                    fancy.setAttribute("style", eleHeight+'px');
                    fancy.setAttribute('src', "http://www.tronc.com/tronc-logo.png");
                    */
                    var newText = text.replace(
                      /(mr\. )?(trump|donald.*trump)/gi,
                      //fancy
                      '<img style="height:'+eleHeight+'px" src="http://www.tronc.com/tronc-logo.png"/>'
                    );
                    var newNode = jQuery("<span>"+newText+"</span>").get(0);
                    node.parentNode.replaceChild(newNode, node);

                } else {
                    var replacedText = text.replace(/(mr\. )?(trump|donald.*trump)/gi, 'Tronc');
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }

            }
        }
    }
}

// Do it once
troncIt();

// AND KEEP ON DOING IT!
//setInterval(troncIt, 1000);
