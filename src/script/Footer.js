class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');

        :host {
          display: block;
          width: 100%;
          background-color: #02000a; 
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 40px 20px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #ededed;
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          height: 300px;
          text-align: center;
        }

        .brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }

        .links {
          display: flex;
          gap: 20px;
        }

        .links a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .links a:hover {
          color: #a054d6;
        }

        .copyright {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 10px;
        }

        span {
          color: #a054d6;
        }
      </style>

      <div class="footer-container">
        <div class="brand">Juventude <span>São Gerardo</span></div>
        
        <div class="links">
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">Contato</a>
        </div>

        <p class="copyright">© 2024 Todos os direitos reservados.</p>
      </div>
    `;
  }
}

customElements.define('footer-component', Footer);