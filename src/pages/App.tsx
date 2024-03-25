import * as React from 'react';
//console.log("env=", process.env.NODE_ENV)
//
export default function Page() { 
    return (
    <html>
        <head>
            <title>welcome</title>
            {(process.env.NODE_ENV === "develop") ? (
                <link href="/static/main.css" rel="stylesheet" /> 
            ): (
                <link href="/public/static/main.css" rel="stylesheet" /> 
            )} 
        </head>
        <body>
            <div id="app"></div>
            {(process.env.NODE_ENV === "develop") ? (
                <script type="module" src="/static/main.js"></script>
            ): (
                <script type="module" src="/public/static/main.js"></script> 
            )}             
        </body>
    </html>
    );
}
/*
<div className="container mx-auto my-2 px-8 bg-white">
</div>
<a href="/">[ home ]</a>
<a href="/about">[ about ]</a>
<a href="/test">[ test ]</a>
<hr />
<h1 className="text-4xl font-bold">Hello!</h1>
*/
