class BookCover extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("section");
    let page = +this.getAttribute("page");
    if (page < 150) page = 150;
    if (page > 500) page = 500;
    wrapper.innerHTML = `
    	<style>
      	section{
            margin: 2rem;
            perspective: 1000px;
            transform-style: preserve-3d;
            display: inline-block;
            padding-right: 25px;
          }

          .book {
            pointer-events: none;
            position: relative;
            width: 250px;
            height: 400px;
            background-image: url(${this.getAttribute("cover")});
            background-size: cover;
            background-position: center;
            transform: rotateY(-17deg);
            transition: 1500ms ease;
            transform-style: preserve-3d;
            transform-origin: right;
            box-shadow: 1px 35px 20px rgba(0, 0, 0, .4);
          }

          .book::before{
            --book-size: calc(var(--total-page, 150px) * .2);
            pointer-events: none;
            content: '';
            position: absolute;
            right: calc(-1 * var(--book-size));
            top: 0px;
            bottom: 0px;
            width: var(--book-size);
            max-width: 400px;
            background: linear-gradient(to right, #dedede 80%, black 50%);
            transform: rotateY(70deg);
            transform-origin: left;
            transition: 1500ms;
          }

          section:hover .book{
            transform: rotateY(0deg);
          }

          section:hover .book::before{
            transform: rotateY(150deg);
          }
      </style>
    	<div class="book" style="--total-page: ${page}px;">
			</div>  
    `;
    this.shadowRoot.append(wrapper);
  }
}
customElements.define("book-cover", BookCover);
