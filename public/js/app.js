//Sticky header when scroll
let navItems = document.querySelectorAll('.navbar ul a');
let imagenLogo = document.querySelector('.header-logo img');
let header = document.querySelector('.header');

window.addEventListener('scroll', () => {
	if( window.scrollY > 200) {

		for(let i = 0; i < navItems.length; i++){
			navItems[i].classList.add('sticky-navbar')
		}

		imagenLogo.classList.add('sticky-reduce-size');
		header.classList.add('sticky-header');
	}
	else if (window.scrollY < 200) {

		for(let i = 0; i < navItems.length; i++){
			navItems[i].classList.remove('sticky-navbar')
		}

		imagenLogo.classList.remove('sticky-reduce-size');
		header.classList.remove('sticky-header');
	}
})

//Fuctionality of the menu with the shopping cart
let menuItems = document.querySelectorAll('.contenedor-menu');
let carrito = document.querySelector('.carrito-compras');
let carritoTotal = document.querySelector('.carrito-compras-total');

function obtenerTitulo () {
	let total = 0;

	for (let i = 0; i < menuItems.length; i++) {
		menuItems[i].addEventListener('click', () => {
			//Obtain values of clicked item
			let titulo = menuItems[i].children[1].innerHTML;
			let precio = menuItems[i].children[3].innerHTML;
			//Append the values
			let nuevoP = document.createElement("P");
			let pedido = document.createTextNode(titulo + ": $" + precio);
			nuevoP.appendChild(pedido);
			carrito.appendChild(nuevoP);

			//Obtaine total
			let precioNum = parseInt(precio);
			total += precioNum;
			carritoTotal.innerHTML = "<strong>Total: $" + total + "</strong>";
		});

		//on mouse down
		menuItems[i].addEventListener('mousedown', () => {
			menuItems[i].style.border = "2px solid #ccc";
		});

		//on mouse up
		menuItems[i].addEventListener('mouseup', () => {
			menuItems[i].style.border = "none";
		});

	};
};
obtenerTitulo();
