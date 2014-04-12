	$(function(){
		$("[type=file]").change(function(){
			alert('jee');
			var file = this.files[0],
				reader = new FileReader(),
				img = $(this).siblings('img')
			reader.onload = function (e) {
				img.attr('src', e.target.result);
				img.attr('exif', 'True');
				img.attr('id', 'img1');
				
				
			}
			reader.readAsDataURL(file);
		})
	})