import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter as Router,
	Link,
	Route
} from 'react-router-dom'

/**
 * We fake a JSON "database" like this:
 * - A list of many topics
 * - Each topic has a list of many resources
 * - In homepage, we show the list of topics, when user click to a topic, we render the list of it resources's name,
 * when user click in a resource name, we render that resource's detail.
 */
const topicsList = [
  {
    name: 'React Router',
    id: 'react-router',
    description: 'Declarative, component based routing for React',
    resources: [
      {
        name: 'URL Parameters',
        id: 'url-parameters',
        description: "URL parameters are parameters whose values are set dynamically in a page's URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it.",
        url: 'https://tylermcginnis.com/react-router-url-parameters'
      },
      {
        name: 'Programatically navigate',
        id: 'programmatically-navigate',
        description: "When building an app with React Router, eventually you'll run into the question of navigating programmatically. The goal of this post is to break down the correct approaches to programmatically navigating with React Router.",
        url: 'https://tylermcginnis.com/react-router-programmatically-navigate/'
      }
    ]
  },
  {
    name: 'React.js',
    id: 'reactjs',
    description: 'A JavaScript library for building user interfaces',
    resources: [
      {
        name: 'React Lifecycle Events',
        id: 'react-lifecycle',
        description: "React Lifecycle events allow you to tie into specific phases of a component's life cycle",
        url: 'https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/'
      },
      {
        name: 'React AHA Moments',
        id: 'react-aha',
        description: "A collection of 'Aha' moments while learning React.",
        url: 'https://tylermcginnis.com/react-aha-moments/'
      }
    ]
  },
  {
    name: 'Functional Programming',
    id: 'functional-programming',
    description: 'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.',
    resources: [
      {
        name: 'Imperative vs Declarative programming',
        id: 'imperative-declarative',
        description: 'A guide to understanding the difference between Imperative and Declarative programming.',
        url: 'https://tylermcginnis.com/imperative-vs-declarative-programming/'
      },
      {
        name: 'Building User Interfaces with Pure Functions and Function Composition',
        id: 'fn-composition',
        description: 'A guide to building UI with pure functions and function composition in React',
        url: 'https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js/'
      }
    ]
  }
]

/**
 * A React componetn can be defined at a function like this (ES6). We use this style for static-simple components
 * or the components that don't need to interact with prop/state. 
 */
function Home() {
	return (
		<h1>HOME</h1>
	)
}

/**
 * Define a Resource component to display the detail info of a topic (name, description, url).
 * It receive a prop variable {match}, then find in the topicsList collection to get the topic that have the id that equal
 * match.params.subId
 * It has a link ref to current topic.url
 * @param {match} match json pair info which contains a "URL" and a "params" collection.  
 */
function Resource ( {match} ) {
	const topic = topicsList.find(({ id }) => id === match.params.topicId).resources.find(({ id }) => id === match.params.subId);

	return (
		<div>
			<h3>{topic.name}</h3>
			<p>{topic.description}</p>
			<a href={topic.url}>More info.</a>
		</div>
	)
}

function Topic ( {match} ) {
	const topic = topicsList.find(({ id }) => id === match.params.topicId);
	
	return (
    <div>
			<h2>{topic.name}</h2>
			<p>{topic.description}</p>

			<ul>
				{topic.resources.map((sub) => (
					<li key={sub.id}>
						<Link to={ '${match.url}/${sub.id}' }>{sub.name}</Link>
					</li>
				))}
			</ul>

			<hr />

			<Route path={ '${match}/:subId' } component={Resource} />
		</div>
  )
}

function Topics ( {match} ) {
	return (
		<div>
			<h1>Topics</h1>
			<ul>
				{topicsList.map(({ name, id }) => (
					<li key={id}>
						<Link to={'${match.url}/${id}'}>{name}</Link>
					</li>
				))}
			</ul>

			<hr />

			<Route path={'${match.path}/topics/:topicId'} component={Topic} />
		</div>
	)
}

class App extends Component {

	render() {
    return (
      <Router>
      	<div style={{width: 1000, margin: '0 auto'}}>
      		<ul>
      			<li><Link to='/'>Home</Link></li>
      			<li><Link to='/topics'>Topics</Link></li>
      		</ul>

					<hr/>

					<Route exact path="/" component={Home} />
					<Route path="/topics" component={Topics} />
      	</div>
      </Router>
    )
  }
}

export default App;
