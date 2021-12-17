import React,{useEffect,useState,useRef}  from 'react';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    mycanvas : {
        width : '100%',
        height : '1000px',
    },
    box : {
        width : '100%',
        overflow:'auto',
        position : 'relative'
    }
}))

export default function Canvas(props) {
    const {image,data} = props
    const [coordinates, setCoordinates] = useState(data);
    const canvasRef = useRef(null)
    const classes = useStyles();

    const resizeCanvasToDisplaySize = canvas => {
    
        const { width, height } = canvas.getBoundingClientRect();
    
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          return true;
        }
    
        return false;
    }
      
      const drawImage = (ctx, img, cvs) => {
        const image = new Image(); // Using optional size for image
        image.src = "data:image/png;base64,"+img;
        var hRatio = cvs.width  / image.width;
        var vRatio =  cvs.height / image.height;
        var ratio  = Math.max( hRatio, vRatio );
        var centerShift_x = ( cvs.width - image.width*ratio ) / 2;
        var centerShift_y = ( cvs.height - image.height*ratio ) / 2;
        ctx.clearRect(0,0,cvs.width, cvs.height);  
        ctx.drawImage(image, 0,0, image.width, image.height,
            centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);

        ctx.drawImage(image,0,0,image.width,image.height,0,0,image.width*ratio,image.height*ratio);
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "red";
        if(coordinates != undefined){
            coordinates.map(coordinate =>{
                var box_upper_x = coordinate.position_x1 * cvs.width;
                var box_upper_y = coordinate.position_y1 * cvs.height;
                var box_width = (coordinate.position_x2-coordinate.position_x1) * cvs.width;
                var box_height = (coordinate.position_y2-coordinate.position_y1) * cvs.height;
                ctx.rect(box_upper_x, box_upper_y, box_width, box_height);
                ctx.stroke();
            })

        }

      }
      

      useEffect(() => {
        setCoordinates(data);
        const canvas = canvasRef.current;
        resizeCanvasToDisplaySize(canvas);
        const context = canvas.getContext('2d');

        drawImage(context,image,canvas)
      }, [drawImage])

    return (
        <div>
            <canvas className={classes.mycanvas} ref={canvasRef} {...props}/>
        </div>
    )
  
}