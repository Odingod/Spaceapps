	$(function(){
		$("[type=file]").change(function(){
			var file = this.files[0],
				reader = new FileReader(),
				img = $(this).siblings('img')
			reader.onloadend = function (e) {
				img.attr('src', e.target.result);
				img.attr('exif', 'True');
				img.attr('id', 'img1');
				img.attr('name', file.name);
				console.log(file.name);
				console.log(e.target.result);
			}
			reader.readAsDataURL(file);
		})
	})