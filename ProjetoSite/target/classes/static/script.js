// ================= Pop-up =================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(()=> toast.remove(),500); }, 3000);
}

// ================= POST Helper =================
async function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// ================= Cadastro =================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        if(name.length<3 || password.length<6) { showToast('Nome min 3 e senha min 6'); return; }
        const resp = await postData('http://localhost:8080/users', {name,email,password});
        if(resp.ok) { showToast('Registrado com sucesso!'); setTimeout(()=>window.location.href='index.html',1000); }
        else showToast('Erro ao registrar!');
    });
}

// ================= Login =================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        try {
            const resp = await postData('http://localhost:8080/users/login',{email,password});
            const text = await resp.text();
            if(text.includes('bem-sucedido')) {
                showToast('Login bem-sucedido!');
                setTimeout(()=>window.location.href='dashboard.html',1000);
            } else showToast('Email ou senha incorretos!');
        } catch(err) { console.error(err); showToast('Erro de conexão!'); }
    });
}

// ================= Dashboard =================
if(document.querySelector('.dashboard-container')) {

    const welcome = document.querySelector('.welcome-card');
    setTimeout(()=> welcome.classList.add('fade-in'),500);

    const typeEl = document.querySelector('.typewriter');
    const message = "Explore os filmes mais quentes do StreamFlix!";
    let i = 0;
    function typeWriter() { if(i<message.length){ typeEl.textContent+=message[i]; i++; setTimeout(typeWriter,50); } }
    typeWriter();

    // Catálogo com imagens reais genéricas
    const catalogsData = [
        {category:"Mais Populares", movies:[
                {title:"Matrix", img:"img/matrix.jpg", synopsis:"Um hacker descobre a realidade é uma simulação."},
                {title:"Inception", img:"img/inception.jpg", synopsis:"Um ladrão entra nos sonhos para roubar segredos."},
                {title:"Avatar", img:"img/avatar.jpge", synopsis:"Um humano em um mundo alienígena luta pelo povo local."},
                {title:"The Batman", img:"img/batman.jpg", synopsis:"O Cavaleiro das Trevas enfrenta novos vilões em Gotham."},
                {title:"Titanic", img:"img/titanic.jpg", synopsis:"Um romance em meio ao desastre do navio Titanic."}
            ]},
        {category:"Top 10", movies:[
                {title:"Avengers", img:"img/avengers.jpg", synopsis:"Heróis se unem para salvar o mundo."},
                {title:"Joker", img:"img/joker.jpg", synopsis:"A origem do maior vilão de Gotham."},
                {title:"Interstellar", img:"img/inter.jpg", synopsis:"Viagem pelo espaço para salvar a humanidade."},
                {title:"Gladiator", img:"img/gladiador.jpg", synopsis:"Um general traído busca vingança no Coliseu."},
                {title:"Shrek", img:"img/sh.jpg", synopsis:"Um ogro improvável embarca em aventura divertida."}
            ]},
        {category:"Em Alta", movies:[
                {title:"The Godfather", img:"img/gf.jpg", synopsis:"A história de uma família mafiosa poderosa."},
                {title:"Pulp Fiction", img:"img/pf.jpg", synopsis:"Vidas se cruzam em histórias de crime e humor."},
                {title:"Forrest Gump", img:"img/fg.jpg", synopsis:"Um homem simples testemunha grandes momentos da história."},
                {title:"The Lion King", img:"img/l.jpg", synopsis:"O jovem leão enfrenta seu destino como rei."},
                {title:"Spider-Man", img:"img/s.jpg", synopsis:"O Homem-Aranha protege Nova York de vilões."}
            ]}
    ];

    const catalogsContainer = document.getElementById('catalogs');

    catalogsData.forEach(cat=>{
        const section = document.createElement('section');
        section.className='movie-category';

        const title = document.createElement('h2');
        title.textContent = cat.category;
        section.appendChild(title);

        const row = document.createElement('div');
        row.className='movie-row';

        cat.movies.forEach((movie,idx)=>{
            const card = document.createElement('div');
            card.className='movie-card';

            const img = document.createElement('img');
            img.src = movie.img;
            card.appendChild(img);

            const h3 = document.createElement('h3');
            h3.textContent = movie.title;
            card.appendChild(h3);

            // Overlay hover
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            const syn = document.createElement('p');
            syn.textContent = movie.synopsis;
            syn.style.fontSize='0.85em';
            syn.style.textAlign='center';
            overlay.appendChild(syn);
            const playBtn = document.createElement('button');
            playBtn.textContent='▶ Play';
            overlay.appendChild(playBtn);
            card.appendChild(overlay);

            row.appendChild(card);

            // animação sutil
            setInterval(()=>{ card.style.transform=`scale(${1+Math.sin(Date.now()/1000+idx)*0.02})`; },50);
        });

        section.appendChild(row);
        catalogsContainer.appendChild(section);
    });
}
