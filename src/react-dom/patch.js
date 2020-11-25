import { Element } from '../my-react'
import { setProperty, createDom } from './index'
import { PATCHES_TYPE } from './patches-type'

export function patch(node, patches) {
    let patchHelper = {
        Index: 0
    }
    dfsPatch(node, patches, patchHelper);
}

function dfsPatch(node, patches, patchHelper) {
    let currentPatch = patches[patchHelper.Index];
    node.childNodes.forEach(child => {
        patchHelper.Index++
        dfsPatch(child, patches, patchHelper);
    });
    if (currentPatch) {
        doPatch(node, currentPatch);
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case PATCHES_TYPE.ATTRS:
                for (let key in patch.attrs) {
                    if (patch.attrs[key] !== undefined) {
                        setProperty(node, key, patch.attrs[key]);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case PATCHES_TYPE.TEXT:
                node.textContent = patch.text;
                break;
            case PATCHES_TYPE.REPLACE:
                let newNode = patch.node instanceof Element ? createDom(patch.node) : document.createTextNode(patch.node);
                node.parentNode.replaceChild(newNode, node);
                break;
            case PATCHES_TYPE.REMOVE:
                node.parentNode.removeChild(node);
                break;
            case PATCHES_TYPE.ADD:
                patch.nodeList.forEach(newNode => {
                    let n = newNode instanceof Element ? createDom(newNode) : document.createTextNode(newNode);
                    node.appendChild(n);
                });
                break;
            default:
                break;
        }
    })
}