# 🌬️ Project Air Conditioning - Front-end (React + Vite)

Este repositório contém a interface do sistema de agendamento de manutenção de ar-condicionado. O projeto foi focado em uma experiência de usuário (UX) fluida e moderna.

---

## 🛠️ Tecnologias e Ferramentas

* **React 18**: Biblioteca principal para construção da interface.
* **Vite**: Build tool ultra-rápida para o desenvolvimento.
* **TypeScript**: Garantia de tipagem e menos erros em tempo de execução.
* **Axios**: Cliente HTTP para consumo da API hospedada no Render.
* **Lucide React**: Biblioteca de ícones modernos e leves.
* **Tailwind CSS**: Framework para estilização rápida e responsiva.

---

## 🔌 Extensões Recomendadas (VS Code)

Para manter a produtividade e o padrão de código deste projeto:
1.  **ESLint**: Padronização de código.
2.  **Prettier**: Formatação automática ao salvar.
3.  **Tailwind CSS IntelliSense**: Autocompletar das classes CSS.
4.  **ES7+ React/Redux/React-Native snippets**: Atalhos para criação de componentes.

---

## ⚙️ Configuração do Ambiente Local

1.  **Instalação do Node.js**: Certifique-se de usar a versão LTS.
2.  **Clone do Repositório**:
    ```bash
    git clone [https://github.com/LucasSalees/front-end-air.git](https://github.com/LucasSalees/front-end-air.git)
    cd front-end-air
    ```
3.  **Instalação de Dependências**:
    ```bash
    npm install
    ```
4.  **Variáveis de Ambiente**:
    Crie um arquivo `.env.local` na raiz e adicione:
    ```env
    VITE_API_URL=http://localhost:8081/api
    ```
5.  **Executar o Projeto**:
    ```bash
    npm run dev
    ```

---

## 🚀 Deploy (Netlify)

O deploy automático está configurado via GitHub no Netlify.

### Configurações de Build:
* **Build Command**: `npm run build`
* **Publish Directory**: `dist`

### Variáveis de Ambiente no Netlify:
É obrigatório configurar em *Site Settings > Environment Variables*:
* `VITE_API_URL`: `https://project-air-conditioning.onrender.com/api`

### Ajuste de Rotas (SPA):
Para evitar erros 404 ao atualizar a página, o arquivo `public/_redirects` deve conter:
`text`
/* /index.html 200

---

### Desenvolvido por Lucas Sales 🚀