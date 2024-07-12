
const elementPlus = new CSSStyleSheet();
fetch('./element-ui.css').then(resp => resp.text()).then(text => elementPlus.replace(text));
const internalStyle = new CSSStyleSheet();
internalStyle.replace(`
#text {
    white-space: pre-wrap;
}
#text::after {
    content: var(--empty-after-str, "");
}
#edit {
    display: none;
    font-family: inherit;
}
.is-editing #text {
    display: none;
}
.is-editing #edit {
    display: revert;
}
`);


export class HTMLEditableTextView extends HTMLElement {
    #shadowRoot = null;
    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.adoptedStyleSheets.push(elementPlus);
        this.#shadowRoot.adoptedStyleSheets.push(internalStyle);
        this.#shadowRoot.innerHTML = `<span
        id=root><span id=text title="Click to edit"><slot
        ></slot></span><textarea rows=3 id=edit type=text class="el-input__inner"
            style="width: 100%; box-sizing: border-box; height: 5em; line-height: revert; padding: 0.5em"
            title="[Escape] to cancel, [Enter] to submit, [Shift+Enter] to create new line"></textarea></span>`;
        const root = this.#shadowRoot.getElementById('root');
        const editBox = this.#shadowRoot.getElementById('edit');
        const editBtn = this.#shadowRoot.getElementById('text');
        this.onkeyup = ev => {
            if (ev.target !== this) return;
            if (ev.key === 'Enter') (ev.preventDefault(), this.click());
        };
        this.onclick = () => {
            if (root.classList.contains('is-editing')) return;
            editBox.value = this.innerText;
            root.classList.add('is-editing');
            editBox.focus();
        };
        editBox.onkeydown = ev => {
            if (ev.key === 'Escape') {
                editBox.shouldBlur = true;
                root.classList.remove('is-editing');
                return;
            }
            if (ev.key === 'Enter' && (!ev.shiftKey)) {
                if (!(ev.detail === 1)) editBox.shouldBlur = true;
                ev.preventDefault();
                ev.stopPropagation();
                root.classList.remove('is-editing');
                const oldValue = this.innerText;
                const newValue = editBox.value;
                if (oldValue === newValue) return;
                if (!this.dispatchEvent(new CustomEvent('beforeupdate', { bubbles: true, cancelable: true, detail: { oldValue, newValue } }))) return;
                this.innerText = newValue;
                this.dispatchEvent(new CustomEvent('updated', { bubbles: true, cancelable: false, detail: { oldValue, newValue } }));
                return;
            }
        };
        editBox.onblur = () => {
            if (editBox.shouldBlur) return !(editBox.shouldBlur = false);
            editBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', detail: 1 }));
        };
    }

    connectedCallback() {
        this.tabIndex = 0;
        this.role = 'button';
    }



};


customElements.define('editable-text-view', HTMLEditableTextView);


const myCSS = new CSSStyleSheet();
myCSS.replace(`editable-text-view:empty {
    --empty-after-str: "(click to edit)";
}`);
document.adoptedStyleSheets.push(myCSS);


