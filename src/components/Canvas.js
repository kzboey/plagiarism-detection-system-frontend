import React,{useEffect,useState,useRef}  from 'react';
import {makeStyles,Container} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    mycanvas : {
        width : '100%',
        height : '100%',
    },
    box : {
        paddingLeft: '12px',
        paddingRight: '12px',
    }
}))

export default function Canvas(props) {
    const {image,data,isPopOut,pname,popOutElement} = props
    const [coordinates, setCoordinates] = useState(data);
    const canvasRef = useRef(null)
    const classes = useStyles();
    const elements = [];
    let WIDTH, HEIGHT = 0; 
    let clientWidth, clientHeight = 0; 

    const resizeCanvasToImageSize = (canvas, width, height) =>{
        canvas.width = width;
        canvas.height = height;
        WIDTH = canvas.width;
        HEIGHT = canvas.height;
        clientWidth = canvas.clientWidth;
        clientHeight= canvas.clientHeight;
        return canvas;
    }

    function drawImage(ctx, img, cvs){
        if(ctx === undefined || img=== undefined || cvs=== undefined) return;
        //draw image
        const image = new Image();
        image.src = "data:image/png;base64,"+img;
        image.onload = function(){
            console.log("image is loaded: "+pname);
            cvs=resizeCanvasToImageSize(cvs, image.width, image.height);
            var hRatio = cvs.width  / image.width;
            var vRatio =  cvs.height / image.height;
            var ratio  = Math.min( hRatio, vRatio );
            var centerShift_x = ( cvs.width - image.width*ratio ) / 2;
            var centerShift_y = ( cvs.height - image.height*ratio ) / 2;

            ctx.clearRect(0,0,cvs.width, cvs.height);  
            ctx.drawImage(image, 0,0, image.width, image.height,
                centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
            //draw bouding box
            ctx.beginPath();
            ctx.lineWidth = "7"; 
            ctx.font = "5rem Arial";  
            cvs.elements = [];
            let numberList = [];
            if(coordinates !== undefined && coordinates.lenght !== 0){
                coordinates.map(coordinate =>{
                    ctx.strokeStyle = coordinate.content_type === "sentence" ? "red" : "blue";
                    var box_upper_x = coordinate.position_x1;
                    var box_upper_y = coordinate.position_y1;
                    var box_width = coordinate.position_x2 - coordinate.position_x1;
                    var box_height = coordinate.position_y2 - coordinate.position_y1;
                    let isNewElement = addElements(box_upper_x, box_upper_y, box_width, box_height, coordinate.origin, coordinate.content_id);
                    var mid_y = coordinate.position_y2 -(box_height/4);
                    var counter_space_adjust = coordinate.counter>= 10 ? 100 : 75;
                    if(isNewElement){
                        ctx.strokeRect(box_upper_x, box_upper_y, box_width, box_height);
                        if(!isPopOut){
                            numberList.push({counter: coordinate.counter, box_upper_x: box_upper_x-counter_space_adjust, mid_y: mid_y, strokeStyle: ctx.strokeStyle});
                        }    
                    }else{
                        if(!isPopOut){
                            var lastCounter = numberList[numberList.length-1].counter;
                            var newCounter = lastCounter + ', '+ coordinate.counter;
                            var newCounterLength = newCounter.split(',').length;
                            numberList.pop();
                            numberList.push({counter: newCounter, box_upper_x: box_upper_x-(newCounterLength*counter_space_adjust), mid_y: mid_y, strokeStyle: ctx.strokeStyle});
                        }            
                    }
                });
                numberList.map(number =>{
                    ctx.strokeStyle = number.strokeStyle;
                    ctx.strokeText(number.counter, number.box_upper_x, number.mid_y);
                })
            } 

        }
    }

    const addElements = (box_upper_x, box_upper_y, box_width, box_height, c_origin, content_id) =>{
        let isNewElement = true;
        if(elements.length === 0){
            elements.push({left:box_upper_x, top:box_upper_y, width:box_width, height:box_height, origin: [c_origin], content_id: content_id}); //origin: content id of source
        }else{
            elements.forEach(element =>{
                if(element.left === box_upper_x && element.top === box_upper_y && element.width === box_width && element.height === box_height && element.origin !== c_origin){
                    element.origin.push(c_origin);
                    isNewElement = false;
                }
            })
            if(isNewElement){
                elements.push({left:box_upper_x, top:box_upper_y, width:box_width, height:box_height, origin: [c_origin], content_id: content_id});
            }
        }
        return isNewElement;
    }

    //clicking on bounding box to generate a popup
    const handleClick = (e) => {
        e.preventDefault();
        let adjusted_width = (WIDTH/clientWidth);
        let adjusted_height = (HEIGHT/clientHeight);
        let x = adjusted_width* (e.pageX - canvasRef.current.offsetLeft);
        let y = adjusted_height * (e.pageY - canvasRef.current.offsetTop);

        elements.forEach(element => {
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                callbackElement(element.content_id, element.origin);
            }
        })   
    }

    const callbackElement = (content_id, origin) =>{
        popOutElement([content_id], origin);
    }

    //Initialization
    useEffect(() => {
        setCoordinates(data);
        const canvas = canvasRef.current;
        if(canvas !== null){
            const context = canvas.getContext('2d');
            drawImage(context,image,canvas);
            canvas.addEventListener('click', handleClick);
        }
    }, [image])

    return (
        <Container className={classes.box}>
            <canvas className={classes.mycanvas} ref={canvasRef}  {...props}/> 
        </Container>
    )  
}
