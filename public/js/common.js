
const allLikeButton = document.querySelectorAll('.like-btn');


async function likeButton(productId, btn) {
    try {
        
        let response = await axios({
            method: 'post',
            url: `/products/${productId}/like`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });

        console.log(response)


        if (btn.children[0].classList.contains('fas')) {
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        } else {
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')
        }
        // console.log(response);
    }
    catch (e) {
        // console.log(e);
        window.location.replace('/login');        //redirect
    }
}


for (let btn of allLikeButton) {
    btn.addEventListener('click', () => {
        let productId = btn.getAttribute('product-id');
        likeButton(productId, btn);
    })
}


