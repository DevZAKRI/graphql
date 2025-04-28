import { renderLoginForm } from "./components/signin.js";
import { loadMainPage } from "./profile.js";
const API_GRAPHQL_URL = "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql";
let query = `{
  user {
    login
    firstName
    lastName
    email: attrs(path: "email")
    campus
    city : attrs(path: "city")
    createdAt
    totalUp
    totalDown
  }
  xp:transaction(where: { type: { _eq: "xp" }, event: { object: { name: { _eq: "Module" } } } }, order_by: {createdAt:desc})
    {
      path
      amount
    }
   lvl: transaction_aggregate(
      where: { type: { _eq: "level" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
        back: transaction_aggregate(
      where: { type: { _eq: "skill_back-end" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
        front: transaction_aggregate(
      where: { type: { _eq: "skill_front-end" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
        html: transaction_aggregate(
      where: { type: { _eq: "skill_html" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
  go: transaction_aggregate(
      where: { type: { _eq: "skill_go" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
  prog: transaction_aggregate(
      where: { type: { _eq: "skill_prog" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
  js: transaction_aggregate(
      where: { type: { _eq: "skill_js" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
}
`

export const getData = () => {

  const token = localStorage.getItem('jwt');
  ;

  fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      loadMainPage(data.data)
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
async function checkAuth() {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return false;

  try {
    const response = await fetch(API_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify({
        query: `{ user { id } }`
      })
    });

    const data = await response.json();
    console.log(data);

    return data.data?.user ? true : false;
  } catch (err) {
    console.log(err);

    return false;
  }
}
(async () => {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    getData()
  } else {
    renderLoginForm();
  }
})();
