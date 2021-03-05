
import Home from './components/Home'

import Artist from './components/Artist'
import TopArtists from './components/TopArtists'

import Track from './components/Track'
import TopTracks from './components/TopTracks'

import Library from './components/Library'

import Search from './components/Search'

import {NavLink, BrowserRouter, Switch, Route} from 'react-router-dom'

import {token as accessToken} from './spotify-api'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()


function App() {

	console.log(accessToken)

	const loginURL = process.env.NODE_ENV !== 'production'
	    ? 'http://localhost:5000/login'
	    : 'https://stark-brook-75138.herokuapp.com/login'


    return (
        <div className="App">
        	{accessToken ? 
	        	<BrowserRouter>
	        		<div className="z-50 fixed bottom-0 lg:left-0 w-full lg:w-48 bg-black shadow-inner lg:h-screen text-white lg:pt-16">
						<div className='lg:space-y-4 flex lg:flex-col justify-between'>
		        			<div className='justify-center mb-6 hidden lg:flex'>
		        				<div><svg className='stroke-0 fill-current text-spotify' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="39" height="39" ><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.55 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.395 0-8 3.605-8 8s3.605 8 8 8 8-3.605 8-8c0-4.414-3.573-8-8-8zm3.75 12.65c-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85-.2.3-.55.4-.85.2zm1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1s-.7.5-1.05.25zM6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75z"/></svg></div>
		        			</div>
							<NavLink className='flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' exact to='/' activeClassName='bg-spotify text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg></span>
								<span className='hidden sm:block'>Profile</span>
							</NavLink>
							<NavLink className='flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/artist' activeClassName='bg-spotify text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0H24V24H0z"/><path d="M19.243 4.757c1.462 1.466 2.012 3.493 1.65 5.38.568.16 1.106.463 1.554.908 1.404 1.394 1.404 3.654 0 5.047L17 21.5l-3.022-3L11 21.485 2.52 12.993C.417 10.637.496 7.019 2.757 4.757c2.265-2.264 5.888-2.34 8.244-.228 2.349-2.109 5.979-2.039 8.242.228zm-6.281 7.708c-.616.611-.616 1.597 0 2.208L17 18.682l4.038-4.009c.616-.611.616-1.597 0-2.208-.624-.62-1.642-.62-2.268.002l-1.772 1.754-1.407-1.396-.363-.36c-.624-.62-1.642-.62-2.266 0zm-8.79-6.293c-1.49 1.49-1.565 3.875-.192 5.451L11 18.654l1.559-1.562-1.006-1c-1.404-1.393-1.404-3.653 0-5.047 1.404-1.393 3.68-1.393 5.084 0l.363.36.363-.36c.425-.421.93-.715 1.465-.882.416-1.367.078-2.912-1.001-3.993-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154z"/></svg></span>
								<span className='hidden sm:block'>Artists</span>
							</NavLink>
							<NavLink className='flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/track' activeClassName='bg-spotify text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 3v14a4 4 0 1 1-2-3.465V5H9v12a4 4 0 1 1-2-3.465V3h13zM5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></span>
								<span className='hidden sm:block'>Tracks</span>
							</NavLink>
							<NavLink className='flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/library' activeClassName='bg-spotify text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"/></svg></span>
								<span className='hidden sm:block'>Your Library</span>
							 </NavLink>
							<NavLink className='flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/search' activeClassName='bg-spotify text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg></span>
								<span className='hidden sm:block'>Search</span>
							</NavLink>
						</div>
					</div>

					<QueryClientProvider client={queryClient}>
						<div className='px-4 lg:ml-48 lg:px-16 lg:py-8 bg-black text-gray-100 min-h-screen'>
			        		<Switch>

			        			<Route exact path='/'>
			        				<Home />
			        			</Route>

			        			<Route path='/artist/:id'>
			        				<Artist />
			        			</Route>

			        			<Route path='/artist'>
			        				<TopArtists />
			        			</Route>

			        			<Route path='/track/:id'>
			        				<Track />
			        			</Route>

			        			<Route path='/track'>
			        				<TopTracks />
			        			</Route>

			        			<Route path='/library'>
			        				<Library />
			        			</Route>

			        			<Route path='/search'>
			        				<Search />
			        			</Route>

			        		</Switch>
						</div>
				    </QueryClientProvider>

	        	</BrowserRouter>
        	: 
        		<div>
        			<a href={loginURL}>Login with Spotify</a>
        		</div>
        }
    </div>
    );
}

export default App;
