"use strict";

var gl;                 // The webgl context.

var a_coords_loc;       // Location of the a_coords attribute variable in the shader program.
var a_coords_buffer;    // Buffer to hold the values for a_coords.
var a_normal_loc;       // Location of a_normal attribute.
var a_normal_buffer;    // Buffer for a_normal.
var index_buffer;       // Buffer to hold vetex indices from model.

var u_diffuseColor;     // Locations of uniform variables in the shader program
var u_specularColor;
var u_specularExponent;
var u_lightPosition;
var u_modelview;
var u_projection;
var u_normalMatrix;

var projection = mat4.create();          // projection matrix
var modelview;                           // modelview matrix; value comes from rotator
var normalMatrix = mat3.create();        // matrix, derived from model and view matrix, for transforming normal vectors
var rotator;                             // A TrackballRotator to implement rotation by mouse.

var lastTime = 0;
var colors = [  // RGB color arrays for diffuse and specular color values
    [1,1,1],
];

var lightPositions = [  // values for light position
  [0,0,0,1],
];

var objects = [         // Objects for display
    chair(), table(), cube()
];

var currentModelNumber;  // contains data for the current object

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}


function perspective(out, fovy, aspect, near, far){

    if (document.getElementById("my_gl").checked) {
         /*
        TODO: Your code goes here.
        Write the code to perform perspective transformation.
        Think about what would be the input and output to the function would be
        */
    }
    else {
        mat4.perspective(out, fovy, aspect, near, far);
    }
}

function translate(modelview, translation){

    if (document.getElementById("my_gl").checked) {
        /*
        TODO: Your code goes here.
        Write the code to perform translation transformation.
        Think about what would be the input and output to the function would be
        */
    }
    else {
        /*
        TODO: Your code goes here.
        use inbuilt_gl functions to perform translation
        */
        mat4.translate(modelview, modelview, translation);
    }
}

function rotate(modelview, angle, axis){

    if (document.getElementById("my_gl").checked) {
        /*
        TODO: Your code goes here.
        Write the code to perform rotation about ARBITARY axis.
        Note: One of the input to this function would be axis vector around which you would rotate.
        Think about what would be the input and output to the function would be
        */
    }
    else {
        /*
        TODO: Your code goes here.
        use inbuilt_gl functions to perform rotation
        */
        mat4.rotate(modelview, modelview, angle, axis);
    }

}

function scale(modelview, scaling){

    if (document.getElementById("my_gl").checked) {
        /*
        TODO: Your code goes here.
        Write the code to perform scale transformation.
        Think about what would be the input and output to the function would be
        */
    }
    else {
        /*
        TODO: Your code goes here.
        use inbuilt_gl functions to perform scaling
        */
        mat4.scale(modelview, modelview, scaling);
    }
}



function draw() {
    //define constants
    const chairScaleFactor = 1.2;

    gl.clearColor(0.15,0.15,0.3,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    projection = mat4.create();
    perspective(projection, Math.PI/5, 1, 10, 20);
    modelview = rotator.getViewMatrix();

    // draw the 1st chair , object[0]
    let chair1AngleDeg = 180;
    let chair1AngleRad = degToRad(chair1AngleDeg);
    let tx1 = -2;
    let ty1 = 0;
    let tz1 = 0;

    installModel(objects[0]);
    currentModelNumber = 0;

    //-------apply chair 1 transformation-------
    translate(modelview, [tx1, ty1, tz1]);
    scale(modelview, [chairScaleFactor, chairScaleFactor, chairScaleFactor]);
    rotate(modelview, chair1AngleRad, [0, 1, 0]);
    
    update_uniform(modelview,projection, 0);

    //reverse chair 1 tranformations
    rotate(modelview, -chair1AngleRad, [0, 1, 0]);
    scale(modelview, [1/chairScaleFactor, 1/chairScaleFactor, 1/chairScaleFactor]);
    translate(modelview, [-tx1, -ty1, -tz1]);

    /*
    TODO: Your code goes here.
    Compute all the necessary transformation to align object[0] (chair)
    Use your own functions with the proper inputs i.e
        1. translate()
        2. scale()
        3. rotate()
    Apply those transformation to the modelview matrix.
    Not all the transformations are relative and they keep on adding as you modify modelview.
    Hence, you might want to reverse the previous transformation. Keep in mind the order
    in which you apply transformation.
    */

    //-------draw the 2nd chair , object[0]-------
    let chair2AngleDeg = 90;
    let chair2AngleRad = degToRad(chair2AngleDeg);
    let tx2 = 0;
    let ty2 = 0;
    let tz2 = 0;

    installModel(objects[0]);
    currentModelNumber = 0;

    //apply chair 2 transformations
    translate(modelview, [tx2, ty2, tz2]);
    scale(modelview, [chairScaleFactor, chairScaleFactor, chairScaleFactor]);
    rotate(modelview, chair2AngleRad, [0, 1, 0]);
    
    update_uniform(modelview,projection, 0);

    //reverse chair 2 tranformations
    rotate(modelview, -chair2AngleRad, [0, 1, 0]);
    scale(modelview, [1/chairScaleFactor, 1/chairScaleFactor, 1/chairScaleFactor]);
    translate(modelview, [-tx2, -ty2, -tz2]);


    //-------draw the 3rd chair , object[0]-------
    let chair3AngleDeg = 0;
    let chair3AngleRad = degToRad(chair3AngleDeg);
    let tx3 = 0.4;
    let ty3 = 0;
    let tz3 = 1.6;

    installModel(objects[0]);
    currentModelNumber = 0;

    //apply chair 3 transformations
    translate(modelview, [tx3, ty3, tz3]);
    scale(modelview, [chairScaleFactor, chairScaleFactor, chairScaleFactor]);
    rotate(modelview, chair3AngleRad, [0, 1, 0]);
    
    update_uniform(modelview,projection, 0);

    //reverse chair 3 tranformations
    rotate(modelview, -chair3AngleRad, [0, 1, 0]);
    scale(modelview, [1/chairScaleFactor, 1/chairScaleFactor, 1/chairScaleFactor]);
    translate(modelview, [-tx3, -ty3, -tz3]);

    //-------draw the 4th chair , object[0]-------
    let chair4AngleDeg = 270;
    let chair4AngleRad = degToRad(chair4AngleDeg);
    let tx4 = -1.6;
    let ty4 = 0;
    let tz4 = 2;

    installModel(objects[0]);
    currentModelNumber = 0;

    //apply chair 4 transformations
    translate(modelview, [tx4, ty4, tz4]);
    scale(modelview, [chairScaleFactor, chairScaleFactor, chairScaleFactor]);
    rotate(modelview, chair4AngleRad, [0, 1, 0]);
    
    update_uniform(modelview,projection, 0);

    //reverse chair 4 tranformations
    rotate(modelview, -chair4AngleRad, [0, 1, 0]);
    scale(modelview, [1/chairScaleFactor, 1/chairScaleFactor, 1/chairScaleFactor]);
    translate(modelview, [-tx4, -ty4, -tz4]);
    

    //-------draw the Table , object[1]-------
    let tableAngleDeg = 45;
    let tableAngleRad = degToRad(tableAngleDeg);
    let tableScaleFactor = 1.02;
    let tablex = -0.9;
    let tabley = 0.55;
    let tablez = 1;

    installModel(objects[1]);
    currentModelNumber = 1;

    scale(modelview, [tableScaleFactor, tableScaleFactor, tableScaleFactor]);
    translate(modelview, [tablex, tabley, tablez]);
    rotate(modelview, tableAngleRad, [0, 1, 0]);

    update_uniform(modelview,projection, 1);

    rotate(modelview, -tableAngleRad, [0, 1, 0]);
    translate(modelview, [-tablex, -tabley, -tablez]);
    scale(modelview, [1/tableScaleFactor, 1/tableScaleFactor, 1/tableScaleFactor]);

    //-------draw the Cube , object[2]-------
    let cubeScaleFactor = 0.5;
    let cubex = -0.8;
    let cubey = 0.95;
    let cubez = 1;

    installModel(objects[2]);
    currentModelNumber = 2;

    translate(modelview, [cubex, cubey, cubez]);
    scale(modelview, [cubeScaleFactor, cubeScaleFactor, cubeScaleFactor]);

    update_uniform(modelview,projection, 2);

    scale(modelview, [1/cubeScaleFactor, 1/cubeScaleFactor, 1/cubeScaleFactor]);
    translate(modelview, [cubex, cubey, cubez]);
}

/*
  this function assigns the computed values to the uniforms for the model, view and projection
  transform
*/
function update_uniform(modelview,projection,currentModelNumber){

    /* Get the matrix for transforming normal vectors from the modelview matrix,
       and send matrices to the shader program*/
    mat3.normalFromMat4(normalMatrix, modelview);

    gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
    gl.uniformMatrix4fv(u_modelview, false, modelview );
    gl.uniformMatrix4fv(u_projection, false, projection );
    gl.drawElements(gl.TRIANGLES, objects[currentModelNumber].indices.length, gl.UNSIGNED_SHORT, 0);
}



/*
 * Called and data for the model are copied into the appropriate buffers, and the
 * scene is drawn.
 */
function installModel(modelData) {
     gl.bindBuffer(gl.ARRAY_BUFFER, a_coords_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
     gl.vertexAttribPointer(a_coords_loc, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(a_coords_loc);
     gl.bindBuffer(gl.ARRAY_BUFFER, a_normal_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
     gl.vertexAttribPointer(a_normal_loc, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(a_normal_loc);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);
}


/* Initialize the WebGL context.  Called from init() */
function initGL() {
    var prog = createProgram(gl,"vshader-source","fshader-source");
    gl.useProgram(prog);
    a_coords_loc =  gl.getAttribLocation(prog, "a_coords");
    a_normal_loc =  gl.getAttribLocation(prog, "a_normal");
    u_modelview = gl.getUniformLocation(prog, "modelview");
    u_projection = gl.getUniformLocation(prog, "projection");
    u_normalMatrix =  gl.getUniformLocation(prog, "normalMatrix");
    u_lightPosition=  gl.getUniformLocation(prog, "lightPosition");
    u_diffuseColor =  gl.getUniformLocation(prog, "diffuseColor");
    u_specularColor =  gl.getUniformLocation(prog, "specularColor");
    u_specularExponent = gl.getUniformLocation(prog, "specularExponent");
    a_coords_buffer = gl.createBuffer();
    a_normal_buffer = gl.createBuffer();
    index_buffer = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST);
    gl.uniform3f(u_specularColor, 0.5, 0.5, 0.5);
    gl.uniform4f(u_diffuseColor, 1, 1, 1, 1);
    gl.uniform1f(u_specularExponent, 10);
    gl.uniform4f(u_lightPosition, 0, 0, 0, 1);
}

/* Creates a program for use in the WebGL context gl, and returns the
 * identifier for that program.  If an error occurs while compiling or
 * linking the program, an exception of type String is thrown.  The error
 * string contains the compilation or linking error.  If no error occurs,
 * the program identifier is the return value of the function.
 *    The second and third parameters are the id attributes for <script>
 * elementst that contain the source code for the vertex and fragment
 * shaders.
 */
function createProgram(gl, vertexShaderID, fragmentShaderID) {
    function getTextContent( elementID ) {
            // This nested function retrieves the text content of an
            // element on the web page.  It is used here to get the shader
            // source code from the script elements that contain it.
        var element = document.getElementById(elementID);
        var node = element.firstChild;
        var str = "";
        while (node) {
            if (node.nodeType == 3) // this is a text node
                str += node.textContent;
            node = node.nextSibling;
        }
        return str;
    }
    try {
        var vertexShaderSource = getTextContent( vertexShaderID );
        var fragmentShaderSource = getTextContent( fragmentShaderID );
    }
    catch (e) {
        throw "Error: Could not get shader source code from script elements.";
    }
    var vsh = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource(vsh,vertexShaderSource);
    gl.compileShader(vsh);
    if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
        throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
     }
    var fsh = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);
    if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
       throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader(prog,vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
       throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}


/**
 * initialization function that will be called when the page has loaded
 */
function init() {
    try {
        var canvas = document.getElementById("myGLCanvas");
        gl = canvas.getContext("webgl") ||
                         canvas.getContext("experimental-webgl");
        if ( ! gl ) {
            throw "Browser does not support WebGL";
        }
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not get a WebGL graphics context.</p>";
        return;
    }

    try {
        initGL();  // initialize the WebGL graphics context
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not initialize the WebGL graphics context:" + e + "</p>";
        return;
    }

    document.getElementById("my_gl").checked = false;
    document.getElementById("my_gl").onchange = draw;
    rotator = new TrackballRotator(canvas, draw, 15);
    draw();
}







