(function () {
  let template = document.createElement("template");
  template.innerHTML = `
      <style>
        :host {}
  
  /* Style for the container */
  div {
    margin: 50px auto;
    max-width: 600px;
  }
  
  /* Style for the input container */
  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  /* Style for the input field */
  #prompt-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #bfbfbf;
    border-radius: 5px;
    width: 70%;
  }
  
  /* Style for the button */
  #generate-button {
    padding: 10px;
    font-size: 16px;
    background-color: #f7f7f7;
    color: #7bbc25;
	border: 1px solid #bfbfbf;
    border-radius: 5px;
    cursor: pointer;
    width: 25%;
  }
  
  /* Style for the generated text area */
  #generated-text {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #bfbfbf;
    border-radius: 5px;
  width:96%;
  }
      </style>
     <div>
  <center>
  <h2>DPO Assistant</h2></center>
    <div class="input-container">
      <input type="text" id="prompt-input" placeholder="Ask a question...">
      <button id="generate-button">Send</button>
    </div>
    <textarea id="generated-text" rows="10" cols="50" readonly></ textarea>
  </div>
    `;
  class Widget extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: "open"
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }
    async connectedCallback() {
      this.initMain();
    }
    async initMain() {
      const generatedText = this.shadowRoot.getElementById("generated-text");
      generatedText.value = "";
	  const {
        urlVal
      } = this._props || "Test Failed";
      const {
        promptVal
      } = this._props || "Test Failed";
      const {
        tokenVal
      } = this._props || "Test Failed";
	  const testString = urlVal + " " + promptVal + " " + tokenVal;
	  const generateButton = this.shadowRoot.getElementById("generate-button");
      generateButton.addEventListener("click", async () => {
        const promptInput = this.shadowRoot.getElementById("prompt-input");
        //const generatedText = this.shadowRoot.getElementById("generated-text");
        generatedText.value = "Finding result...";
        const promptText = promptInput.value;
		
		//generatedText.value = testString;
				
        const response = await fetch(urlVal, {
          method: "POST",
		  body: JSON.stringify({
            "prompt": promptText, 
			"token": tokenVal
          })
        });
        const result = await response.json();
		const resultText = result.body;
		generatedText.value = resultText;
		
      });
    }
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {
        ...this._props,
        ...changedProperties
      };
    }
    onCustomWidgetAfterUpdate(changedProperties) {
      this.initMain();
    }
  }
  customElements.define("com-rohitchouhan-sap-chatgptwidget", Widget);
})();