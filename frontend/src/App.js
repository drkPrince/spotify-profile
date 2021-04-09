
import Home from './components/Home'

import Artist from './components/Artist'
import TopArtists from './components/TopArtists'

import Track from './components/Track'
import TopTracks from './components/TopTracks'

import Library from './components/Library'

import Search from './components/Search'

import Mood from './components/Mood'

import {NavLink, BrowserRouter, Switch, Route} from 'react-router-dom'

import {token as accessToken} from './spotify-api'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()


function App() {


	const loginURL = process.env.NODE_ENV !== 'production'
	    ? 'http://localhost:5000/login'
	    : 'https://sprofile.herokuapp.com/login'


    return (
        <div className="App">
        	{accessToken ? 
	        	<BrowserRouter>
	        		<div className="z-50 fixed bottom-0 border-t-2 border-card lg:left-0 w-full lg:w-48 bg-black shadow-inner lg:h-screen text-white lg:pt-16">
						<div className='lg:mt-16 lg:space-y-4 flex lg:flex-col justify-between h-auto'>
							<NavLink className='lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' exact to='/' activeClassName='text-spotify lg:bg-spotify lg:text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg></span>
								<span className='hidden sm:block'>Profile</span>
							</NavLink>
							<NavLink className='lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/artist' activeClassName='text-spotify lg:bg-spotify lg:text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0H24V24H0z"/><path d="M19.243 4.757c1.462 1.466 2.012 3.493 1.65 5.38.568.16 1.106.463 1.554.908 1.404 1.394 1.404 3.654 0 5.047L17 21.5l-3.022-3L11 21.485 2.52 12.993C.417 10.637.496 7.019 2.757 4.757c2.265-2.264 5.888-2.34 8.244-.228 2.349-2.109 5.979-2.039 8.242.228zm-6.281 7.708c-.616.611-.616 1.597 0 2.208L17 18.682l4.038-4.009c.616-.611.616-1.597 0-2.208-.624-.62-1.642-.62-2.268.002l-1.772 1.754-1.407-1.396-.363-.36c-.624-.62-1.642-.62-2.266 0zm-8.79-6.293c-1.49 1.49-1.565 3.875-.192 5.451L11 18.654l1.559-1.562-1.006-1c-1.404-1.393-1.404-3.653 0-5.047 1.404-1.393 3.68-1.393 5.084 0l.363.36.363-.36c.425-.421.93-.715 1.465-.882.416-1.367.078-2.912-1.001-3.993-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154z"/></svg></span>
								<span className='hidden sm:block'>Artists</span>
							</NavLink>
							<NavLink className='lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/track' activeClassName='text-spotify lg:bg-spotify lg:text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 3v14a4 4 0 1 1-2-3.465V5H9v12a4 4 0 1 1-2-3.465V3h13zM5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></span>
								<span className='hidden sm:block'>Tracks</span>
							</NavLink>
							<NavLink className='lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/library' activeClassName='text-spotify lg:bg-spotify lg:text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"/></svg></span>
								<span className='hidden sm:block'>Library</span>
							 </NavLink>
							<NavLink className='lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full' to='/search' activeClassName='text-spotify lg:bg-spotify lg:text-white'>
								<span><svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="19"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg></span>
								<span className='hidden sm:block'>Search</span>
							</NavLink>
						</div>
					</div>

					<QueryClientProvider client={queryClient}>
						<div className='px-8 lg:ml-48 lg:px-20 lg:py-6 bg-black text-gray-100 min-h-screen overflow-hidden'>
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

			        			<Route path='/mood'>
			        				<Mood />
			        			</Route>

			        		</Switch>
						</div>
				    </QueryClientProvider>

	        	</BrowserRouter>
        	: 
        		<div>
        			<LoginScreen loginURL={loginURL} />
        		</div>
        }
    </div>
    )
}

export default App;


const LoginScreen = ({loginURL}) => {
	return (
		<div className='max-h-screen overflow-hidden'>
			<div className='bg-gradient-to-r from-pink-400 via-pink-600 to-red-200 h-2 w-full'></div>

			<div className='flex flex-col-reverse sm:flex-row px-4 md:px-12 py-16 md:py-24 bg-gradient-to-r from-blue-100 via-red-100 to-yellow-100 h-screen'>
				<div className='w-full sm:w-7/12 pt-16'>
					<h2 className='text-2xl md:text-5xl bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent'>You are what you listen to.</h2>
					<p className='text-lg md:text-xl md:leading-relaxed mb-8 mt-2 text-gray-700'>
						Know which songs you listen to the most, who are your most favourite artists, what constitutes your favourite tracks, get song recommendations based on your mood. And more.
					</p>
					<a className='w-full block sm:inline text-center sm:w-auto bg-spotify text-white rounded-full px-4 py-3 text-xs md:text-sm hover:shadow-md hover:bg-green-600 transition-all duration-300 uppercase tracking-widest' href={loginURL}>Continue with Spotify</a>
				</div>
				<div className='sm:w-5/12 flex justify-center items-center'>
					<img className='w-full ' src={require('./styles/Girl.png').default} alt="girl" />
				</div>
			</div>

		</div>
	)
}


