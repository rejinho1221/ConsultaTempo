async function buscarClima(cidade) {
    const apiKey = 'SUA_API_KEY'; // Substitua pela sua API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }

        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        document.getElementById('msg-erro').innerHTML = `<p style="color:red;">Erro: ${erro.message}</p>`;
        return null;
    }
}

async function exibirResultados() {
    const cidade = document.getElementById('cidade').value;

    let form = document.querySelector('form');
    document.getElementById('msg-erro').textContent = ''
    document.getElementById('temperatura').textContent = '...';
    document.getElementById('clima').textContent = '...';
    document.getElementById('umidade').textContent = '...';
    document.getElementById('vento').textContent = '...';

    const dados = await buscarClima(cidade);

    if (!dados){
        form.reset();
        return;
    }

    document.getElementById('temperatura').innerHTML = `<strong>${dados.main.temp} °C</strong>`;
    document.getElementById('clima').innerHTML = `<strong>${dados.weather[0].description}</strong>`;
    document.getElementById('umidade').innerHTML = `<strong>${dados.main.humidity}%</strong>`;
    document.getElementById('vento').innerHTML = `<strong>${dados.wind.speed} km/h</strong>`;
}
