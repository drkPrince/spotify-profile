
import { Route, NavLink, Switch} from 'react-router-dom'
import Liked from './library/Liked'

import Playlists from './library/Playlists'
import Podcasts from './library/Podcasts'

import PlaylistInfo from './library/PlaylistInfo'
import PodcastInfo from './library/PodcastInfo'



const Library = () => 
{

	return (
		<div className='py-12 px-4 md:py-28 md:px-12'>
			<div className="flex text-gray-500 space-x-8 mb-12">
				<NavLink activeClassName='active-tab' className='hover:text-gray-200' exact to='/library'>Liked</NavLink>
				<NavLink activeClassName='active-tab' className='hover:text-gray-200' to='/library/playlist'>Playlists</NavLink>
				<NavLink activeClassName='active-tab' className='hover:text-gray-200' to='/library/podcasts'>Podcasts</NavLink>
			</div>

			<Switch>
				<Route exact path='/library'>
					<Liked />
				</Route>
				
				<Route exact path='/library/playlist/:id'>
					<PlaylistInfo />
				</Route>
				
				<Route exact path='/library/playlist'>
					<Playlists />
				</Route>
				
				
				<Route exact path='/library/podcasts'>
					<Podcasts />
				</Route>

				<Route exact path='/library/podcasts/:id'>
					<PodcastInfo />
				</Route>

			</Switch>
		</div>

	)
}

export default Library