var app = angular.module('AppProductos', []);

app.controller('ControllerProductos', function($scope, $http) {
  
	displayProducts($scope, $http);

	$scope.showNewProducto = function(x) {
	
		var addProducto = $('#addEmployeeModal');
		addProducto.modal('show');
		
		$scope.newProduct = {"img":"", "titulo": "", "precio": ""}; 

		$('#Nuevo').off('click').on('click', () => {

			var Url = `http://localhost/productos-back/public/index.php/api/productos`;

			var img 		= $scope.newProduct.img;
			var titulo 		= $scope.newProduct.titulo;
			var precio		= $scope.newProduct.precio;

			var data = {"img": img, "titulo": titulo, "precio": precio};
			

			$http.post(Url, data).then(function(response) {
				displayProducts($scope, $http);
			})
			.catch(function(error) {
			  console.error('Error al realizar la solicitud PUT:', error);
			});
			addProducto.modal('hide');
		});

		  $('#fileArchNew').off('change').on('change',function() {
			// Accede al archivo seleccionado
			var archivoSeleccionado = $(this).prop('files')[0];
			if (archivoSeleccionado) {
				$scope.newProduct.img = archivoSeleccionado.name;
			} 
		  });
		
	};

	$scope.showEdit = function(producto) {
	
		var editProducto = $('#editEmployeeModal');
		editProducto.modal('show');
		
		$scope.curretProduct = {...producto}; 

		$('#Modificar').click(() => {

			var Url = `http://localhost/productos-back/public/index.php/api/productos`;
			
			var producto_id = $scope.curretProduct.producto_id; 
			var img 		= $scope.curretProduct.img;
			var titulo 		= $scope.curretProduct.titulo;
			var precio		= $scope.curretProduct.precio;

			var data = {"producto_id": producto_id, "img": img, "titulo": titulo, "precio": precio};
			

			$http.put(Url, data).then(function(response) {
				displayProducts($scope, $http);
			})
			.catch(function(error) {
			  console.error('Error al realizar la solicitud PUT:', error);
			});
			editProducto.modal('hide');
		});

		$('#fileArchEdit').change(function() {
			// Accede al archivo seleccionado
			var archivoSeleccionado = $(this).prop('files')[0];
			if (archivoSeleccionado) {
				$scope.curretProduct.img = archivoSeleccionado.name;
			}
		  });
		
	};
	
	$scope.showDeleteConfirmation = function(producto) {
	
		var deleteConfirmation = $('#deleteConfirmation');
		deleteConfirmation.modal('show');

		$('#deleteConfirmed').click(() => {

						
			var Url = `http://localhost/productos-back/public/index.php/api/productos/${producto.producto_id}`;
	
				$http.delete(Url)
      			.then(function(response) {
					displayProducts($scope, $http);
      			})
      			.catch(function(error) {
		        	console.error('Error al realizar la solicitud DELETE:', error);
      			}	);
			
			deleteConfirmation.modal('hide');
		});
	};

	$scope.showMultipleProducto = function(producto) {
	
		var deleteConfirmation = $('#deleteMultipleConfirmation');
		deleteConfirmation.modal('show');

		$('#deleteMultipleConfirmed').click(() => {

			var Url = `http://localhost/productos-back/public/index.php/api/productos/all`;
			
			var checkboxesMarcados = $(".checkbox:checked");
			var dynamicData = [];
			checkboxesMarcados.each(function() {
				dynamicData.push({"id": $(this).attr('id')});
			});
			

				$http.post(Url, dynamicData)
      			.then(function(response) {
					displayProducts($scope, $http);
      			})
      			.catch(function(error) {
		        	console.error('Error al realizar la solicitud DELETE:', error);
      			}	);
			
			deleteConfirmation.modal('hide');
		});
	};

	
});

function displayProducts($scope, $http){

	const ApiUrl = "http://localhost/productos-back/public/index.php/api/productos";

	$http.get(ApiUrl).then(function(response) {
		$scope.productos = response.data;
	});
}