import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {getUsersTopArtists, getUsersTopArtistsSinceWeeks, getUsersTopArtistsSinceAnYear} from '../spotify-api'
import {SingleCard} from './utils'

const TopArtists = () => 
{
	const weekRef = useRef(null)
	const yearRef = useRef(null)
	const monthRef = useRef(null)

	const allRef = [weekRef, yearRef, monthRef]

	const [artists, setArtists] = useState(null)

	useEffect(() => 
	{
		getUsersTopArtists().then(res =>setArtists(res.data.items))		

	}, [])

	const bringWeeks = (e) => 
	{
		allRef.forEach(ref => {
			ref.current.classList.remove('active-tab')
		})
		e.target.classList.add('active-tab')
		getUsersTopArtistsSinceWeeks().then(res =>setArtists(res.data.items))		
	}

	const bringMonths = (e) => 
	{
		allRef.forEach(ref => {
			ref.current.classList.remove('active-tab')
		})
		e.target.classList.add('active-tab')
		getUsersTopArtists().then(res =>setArtists(res.data.items))		
	}

	const bringYear = (e) => 
	{
		allRef.forEach(ref => {
			ref.current.classList.remove('active-tab')
		})
		e.target.classList.add('active-tab')
		getUsersTopArtistsSinceAnYear().then(res =>setArtists(res.data.items))		
	}

	return (
		<div className='py-12  md:py-28 '>
			<div className='flex text-gray-700 '>
				<h2 ref={weekRef} className='mr-4 px-2 py-1 cursor-pointer hover:text-gray-300 text-sm md:text-base' onClick={bringWeeks}>4 Weeks</h2>	
				<h2 ref={monthRef} className='mr-4 px-2 py-1 cursor-pointer hover:text-gray-300 text-sm md:text-base active-tab' onClick={bringMonths}>6 Months</h2>	
				<h2 ref={yearRef} className='mr-4 px-2 py-1 cursor-pointer hover:text-gray-300 text-sm md:text-base' onClick={bringYear}>Over an Year</h2>	
			</div>

			{artists ?
				<div className='mt-12'>
					<h3 className="text-2xl heading">Your most favourite artists</h3>
					<div className=' grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5'>
						{artists.map(artist => 
							<Link to={`/artist/${artist.id}`} key={artist.id}>
								<SingleCard imageURL={artist.images[2].url} itemName={artist.name}/>
							</Link>
						)}
					</div>
				</div>
				:
				<div className='loader'>Loading, Please Wait</div>
			}
		</div>
	)
}

export default TopArtists