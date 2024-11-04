import { apiCall } from "../scripts/components/apicalls.js";
import { showMessage } from "../scripts/components/showMessage.js";

let bannerBase64 = '';
let thumbnailBase64 = '';

const btnCriarEvento = document.getElementById("btnCriarEvento");

if (btnCriarEvento) {
    btnCriarEvento.addEventListener('click', () => {
        window.location.href = "/pages/adm/criarEventos.html";
    });
}

let bannerCropper, thumbnailCropper;
const bannerInput = document.getElementById('bannerUpload');
const thumbnailInput = document.getElementById('thumbnailUpload');
const bannerImage = document.getElementById('bannerImage');
const thumbnailImage = document.getElementById('thumbnailImage');
const cropBannerBtn = document.getElementById('cropBannerBtn');
const cropThumbnailBtn = document.getElementById('cropThumbnailBtn');

bannerInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            bannerImage.src = event.target.result;
            bannerImage.style.display = 'block';
            cropBannerBtn.style.display = 'inline';

            bannerImage.onload = () => {
                if (bannerCropper) bannerCropper.destroy();
                bannerCropper = new Cropper(bannerImage, {
                    aspectRatio: 900 / 150,
                    viewMode: 1
                });
            };
        };
        reader.readAsDataURL(file);
    }
});

thumbnailInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            thumbnailImage.src = event.target.result;
            thumbnailImage.style.display = 'block';
            cropThumbnailBtn.style.display = 'inline';

            thumbnailImage.onload = () => {
                if (thumbnailCropper) thumbnailCropper.destroy();
                thumbnailCropper = new Cropper(thumbnailImage, {
                    aspectRatio: 800 / 450,
                    viewMode: 1
                });
            };
        };
        reader.readAsDataURL(file);
    }
});

cropBannerBtn.addEventListener('click', () => {
    const croppedCanvas = bannerCropper.getCroppedCanvas({
        width: 900,
        height: 150
    });
    bannerBase64 = croppedCanvas.toDataURL('image/jpeg');

    bannerImage.style.display = 'none';
    cropBannerBtn.style.display = 'none';

    bannerCropper.destroy();
});

cropThumbnailBtn.addEventListener('click', () => {
    const croppedCanvas = thumbnailCropper.getCroppedCanvas({
        width: 800,
        height: 450
    });
    thumbnailBase64 = croppedCanvas.toDataURL('image/jpeg');

    thumbnailImage.style.display = 'none';
    cropThumbnailBtn.style.display = 'none';

    thumbnailCropper.destroy();
});

const eventoDataInicio = document.getElementById('eventoDataInicio');
const eventoDataFim = document.getElementById('eventoDataFim');
const eventoHoraInicio = document.getElementById('eventoHoraInicio');
const eventoHoraFim = document.getElementById('eventoHoraFim');

const eventoBanner = bannerBase64;
const eventoMiniatura = thumbnailBase64;
const eventoDataHoraInicio = `${eventoDataInicio}T${eventoHoraInicio}:00.000Z`
const eventoDataHoraFim = `${eventoDataFim}T${eventoHoraFim}:00.000Z`
const eventoNome = document.getElementById('tituloEvento');
const eventoDesc = document.getElementById('descEvento');
const eventoInst = document.getElementById('instEvento');
const eventoRua = document.getElementById('ruaEvento');
const eventoBairro = document.getElementById('bairroEvento');
const eventoNumero = document.getElementById('numeroEvento');
const eventoCidade = document.getElementById('cidadeEvento');
const eventoEstado = document.getElementById('estadoEvento');

async function criarEvento(e) {
    e.preventDefault();

    if (!eventoDataInicio.value || !eventoHoraInicio.value || !eventoDataFim.value || !eventoHoraFim.value) {
        showMessage("error", "Data e hora de início e fim são obrigatórias!");

        if (!eventoDataInicio.value) {
            eventoDataInicio.value = "";
        }
        if (!eventoHoraInicio.value) {
            eventoHoraInicio.value = "";
        }
        if (!eventoDataFim.value) {
            eventoDataFim.value = "";
        }
        if (!eventoHoraFim.value) {
            eventoHoraFim.value = "";
        }
    } else {
        const eventoDataHoraInicio = `${eventoDataInicio.value}T${eventoHoraInicio.value}:00.000Z`;
        const eventoDataHoraFim = `${eventoDataFim.value}T${eventoHoraFim.value}:00.000Z`;

        const eventoInfo = {
            nome: `${eventoNome.value}`,
            descricao: `${eventoDesc.value}`,
            instituicao: `${eventoInst.value}`,
            dataHoraInicio: `${eventoDataHoraInicio}`,
            dataHoraFim: `${eventoDataHoraFim}`,
            rua: `${eventoRua.value}`,
            numero: `${eventoNumero.value}`,
            bairro: `${eventoBairro.value}`,
            cidade: `${eventoCidade.value}`,
            estado: `${eventoEstado.value}`,
            banner: `${eventoBanner}`,
            miniatura: `${eventoMiniatura}`
        };

        console.log(eventoInfo);

        try {
            console.log("Tentando criar evento..."); // Remover depois
            const response = await apiCall("/eventos", "POST", eventoInfo);
            if (response.success) {
                showMessage("success", "Evento criado com sucesso!");

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showMessage("error", "Erro ao criar evento!");

                eventoNome.value = "";
                eventoDesc.value = "";
                eventoInst.value = "";
                eventoRua.value = "";
                eventoBairro.value = "";
                eventoNumero.value = "";
                eventoCidade.value = "";
                eventoEstado.value = "";
                eventoDataInicio.value = "";
                eventoHoraInicio.value = "";
                eventoDataFim.value = "";
                eventoHoraFim.value = "";
            }
        } catch (e) {
            console.log(e);
            showMessage("error", "Ocorreu um erro ao criar o evento!");
        }
    }
}


// const imagemBase64 = document.getElementById("imagemBase64");
// setInterval((e) => {
//     imagemBase64.src = bannerBase64;
// }, 100);