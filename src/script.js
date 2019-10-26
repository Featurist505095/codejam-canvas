const configFile = 'data/4x4.json';

function draw(state) {
    switch (state) {
        case 1: 
            var myRequest = new Request('configFile');
            break;
        case 2:
            var myRequest = new Request('data/32x32.json');
            break;
        default: {
            let canvas = document.getElementById('canvas');
            canvas.style.backgroundImage = "url('src/assets/images/image.png')";
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

    }

    fetch(myRequest)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            let canvas = document.getElementById('canvas');

            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');

                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        let pixelSize = 512 / data.length;

                        if(data.length === 4)
                            ctx.fillStyle = `#${data[i][j]}`;
                        else
                            ctx.fillStyle = `rgba(${data[i][j][0]},${data[i][j][1]},${data[i][j][2]},${data[i][j][3]})`;
                        
                        ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
    });

}

document.getElementById('first_image').addEventListener('click', () => {
    draw(1);
});
document.getElementById('second_image').addEventListener('click', () => {
    draw(2);
});
document.getElementById('default_image').addEventListener('click', () => {
    draw();
});