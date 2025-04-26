export function typeText(
    el: HTMLElement,
    onComplete: CallableFunction,
    typeInterval = 40
) {
    if (el.style.opacity === "1") {
        return; // Already typed
    }
    const clone = el.cloneNode(true); // Clone the entire structure
    el.innerHTML = "";
    el.style.opacity = "1";

    function typeTextNode(
        textNode: Node,
        parent: Node,
        callback: CallableFunction
    ) {
        const originalText = textNode.textContent || "";
        const newTextNode = document.createTextNode("");
        parent.appendChild(newTextNode);

        let i = 0;
        const interval = setInterval(() => {
            newTextNode.textContent += originalText.charAt(i++);
            if (i >= originalText.length) {
                clearInterval(interval);
                callback();
            }
        }, typeInterval);
    }

    function typeNode(node: Node, parent: Node, done: CallableFunction) {
        if (node.nodeType === Node.TEXT_NODE) {
            typeTextNode(node, parent, done);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node.cloneNode(false); // clone the tag but not children
            parent.appendChild(element);

            const children = Array.from(node.childNodes);
            let index = 0;

            function next() {
                if (index < children.length) {
                    typeNode(children[index++], element, next);
                } else {
                    done();
                }
            }

            next();
        } else {
            done(); // skip comments or other node types
        }
    }

    const children = Array.from(clone.childNodes);
    let i = 0;

    function nextRoot() {
        if (i < children.length) {
            typeNode(children[i++], el, nextRoot);
        } else {
            if (onComplete) {
                onComplete();
            }
        }
    }

    nextRoot();
}
