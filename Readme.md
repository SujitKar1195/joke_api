<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JokeAPI Documentation</title>
    <!--<style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #333;
        }
        pre {
            background: #f4f4f4;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        code {
            background: #f4f4f4;
            border-radius: 4px;
            padding: 2px 4px;
            font-size: 1.1em;
        }
        .example-request, .example-response {
            margin: 20px 0;
        }
        .example-request code, .example-response code {
            display: block;
            padding: 10px;
            background: #eee;
        }
        .example-request pre, .example-response pre {
            border-radius: 4px;
            background: #eee;
            padding: 10px;
        }
        .danger {
            color: red;
            font-weight: bold;
        }
    </style>-->
</head>
<body>
    <div class="container">
        <h1>JokeAPI</h1>
        <p>Welcome to JokeAPI! A public API designed to deliver joy and humor to the world. Below you'll find detailed information on how to interact with the API endpoints to retrieve, add, update, and delete jokes.</p>
        
        <h2>Endpoints</h2>
        
        <h3>GET /random</h3>
        <p>Retrieve a random joke from the Joke API.</p>
        
        <div class="example-request">
            <h4>Example Request:</h4>
            <pre><code>curl --location 'http://localhost:3000/random/'</code></pre>
        </div>
        
        <div class="example-response">
            <h4>Response:</h4>
            <pre><code>{
    "id": 43,
    "jokeText": "What did one ocean say to the other ocean? Nothing, they just waved.",
    "jokeType": "Wordplay"
}</code></pre>
        </div>
        
        <h3>GET /jokes/:id</h3>
        <p>Get a specific joke by its <code>id</code>.</p>
        
        <div class="example-request">
            <h4>Example Request:</h4>
            <pre><code>curl --location 'http://localhost:3000/jokes/2'</code></pre>
        </div>
        
        <div class="example-response">
            <h4>Response:</h4>
            <pre><code>{
    "id": 2,
    "jokeText": "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "jokeType": "Puns"
}</code></pre>
        </div>
        
        <h3>GET /filter</h3>
        <p>Filter jokes by their type.</p>
        <p><strong>Query Parameter:</strong></p>
        <ul>
            <li><code>type</code> - The type of joke to filter by.</li>
        </ul>
        
        <div class="example-request">
            <h4>Example Request:</h4>
            <pre><code>curl --location 'http://localhost:3000/filter?jokeType=Puns'</code></pre>
        </div>
        
        <div class="example-response">
            <h4>Response:</h4>
            <pre><code>[
    {
        "id": 2,
        "jokeText": "Why did the scarecrow win an award? Because he was outstanding in his field.",
        "jokeType": "Puns"
    },
    ...
]</code></pre>
        </div>
        
        <h3>POST /jokes</h3>
        <p>Create a new joke.</p>
        <p><strong>Request Body Parameters:</strong></p>
        <ul>
            <li><code>text</code> - The text of the joke.</li>
            <li><code>type</code> - The type of the joke.</li>
        </ul>
        
        <div class="example-request">
            <h4>Example Request:</h4>
            <pre><code>curl --location 'http://localhost:3000/jokes' \
--data-urlencode 'jokeText=Iamonthemoonandthereisnowheretogetabeer. Thereisnospacebar.' \
--data-urlencode 'jokeType=Science'</code></pre>
        </div>
        
        <div class="example-response">
            <h4>Response:</h4>
            <pre><code>{
    "id": 101,
    "jokeText": "Iamonthemoonandthereisnowheretogetabeer. Thereisnospacebar.",
    "jokeType": "Science"
}</code></pre>
        </div>
        
        <h3>PUT /jokes/:id</h3>
        <p>Replace a joke completely based on the provided <code>id</code>.</p>
        
        <p><strong>Request Body Parameters:</strong></p>
        <ul>
            <li><code>text</code> - The new text for the joke.</li>
            <li><code>type</code> - The new type for the joke.</li>
        </ul>
        
        <div class="example-request">
            <h4>Example Request:</h4>
            <pre><code>curl --location --request PUT 'http://localhost:3000/jokes/2' \
--data-urlencode 'jokeText=Why did the scarecrow win a prize? Because he was outstanding in his field.' \
--data-urlencode 'jokeType=Science'</code></pre>
        </div>
        
        <div class="example-response">
            <h4>Response:</h4>
            <pre><code>{
    "id": 2,
    "jokeText": "Why did the scarecrow win a prize? Because he was outstanding in his field.",
    "jokeType": "Science"
}</code></pre>
        </div>
        
        <h3>DELETE /jokes/:id</h3>
        <p>Delete a specific joke by its <code>id</code>.</p>
        
        <div class="example-request">
            <h4>Example Request:</h4>
            <pre><code>curl --location --request DELETE 'http://localhost:3000/jokes/2'</code></pre>
        </div>
        
        <div class="example-response">
            <h4>Response:</h4>
            <pre><code>OK</code></pre>
        </div>
        
        <h3>DELETE /jokes/all</h3>
        <p>Delete all jokes in the database. <span class="danger">DANGER</span>: This action is irreversible.</p>
        <p><strong>Authentication:</strong> Requires an API Key.</p>
        
        <div class="example-request">
            <h4>Example Request:</h4>
            <pre><code>curl --location --request DELETE 'http://localhost:3000/jokes/all'</code></pre>
        </div>
        
        <div class="example-response">
            <h4>Response:</h4>
            <pre><code>OK</code></pre>
        </div>
        
    </div>
</body>
</html>
#   j o k e _ a p i 
 
 