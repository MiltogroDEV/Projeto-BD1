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
