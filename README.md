## Instal dependencies
npm install

## How to run development build + client server
npm run dev


## How to run production build + client server
npm run build
npm start



## Backend Api Documentation
For each endpoint list the information per the example below!

**Example End Point Name**
List Questions

**Example Request Type, Route and Description**
GET /qa/questions

Retrieves a list of questions for a particular product. This list does not include any reported questions.

**Example Parameters**
Parameter	Type	Description
product_id	integer	Specifies the product for which to retrieve questions.
page	integer	Selects the page of results to return. Default 1.
count	integer	Specifies how many results per page to return. Default 5.

**Example Response Status and Data**
Status: 200 OK

{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      }
  ]
}