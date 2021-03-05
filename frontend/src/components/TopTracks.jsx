import React, {useState, useEffect, useRef} from 'react'
import {DoubleCard} from './utils'
import {Link} from 'react-router-dom'
import {getUsersTopTracks, getUsersTopTracksSinceWeeks, getUsersTopTracksSinceAnYear} from '../spotify-api'

const TopTracks = () => 
{
	const weekRef = useRef(null)
	const yearRef = useRef(null)
	const monthRef = useRef(null)

	const allRef = [weekRef, yearRef, monthRef]

	const [tracks, setTracks] = useState(null)

	useEffect(() => 
	{
		getUsersTopTracks().then(res =>setTracks(res.data.items))		

	}, [])

	const bringWeeks = (e) => 
	{
		allRef.forEach(ref => {
			ref.current.classList.remove('active-tab')
		})
		e.target.classList.add('active-tab')
		getUsersTopTracksSinceWeeks().then(res => setTracks(res.data.items))		
	}

	const bringMonths = (e) => 
	{
		allRef.forEach(ref => {
			ref.current.classList.remove('active-tab')
		})
		e.target.classList.add('active-tab')
		getUsersTopTracks().then(res => setTracks(res.data.items))		
	}

	const bringYear = (e) => 
	{
		allRef.forEach(ref => {
			ref.current.classList.remove('active-tab')
		})
		e.target.classList.add('active-tab')
		getUsersTopTracksSinceAnYear().then(res => setTracks(res.data.items))		
	}

	return (
		<div className='py-12 px-4 md:py-28 md:px-12'>
			<div className='flex text-gray-700'>
				<h2 ref={weekRef} className='mr-4   px-2 py-1 cursor-pointer hover:text-gray-200 text-sm md:text-base' onClick={bringWeeks}>4 Weeks</h2>	
				<h2 ref={monthRef} className='mr-4   px-2 py-1 cursor-pointer hover:text-gray-200 text-sm md:text-base active-tab' onClick={bringMonths}>6 Months</h2>	
				<h2 ref={yearRef} className='mr-4   px-2 py-1 cursor-pointer hover:text-gray-200 text-sm md:text-base' onClick={bringYear}>Over an Year</h2>	
			</div>

			{tracks ?
				<div className='mt-12'>
					<h3 className="text-2xl heading">Your Most Favourite Songs</h3>
					<div className='flex flex-wrap'>
						{tracks.map(track => 
							<Link to={`/track/${track.id}`} key={track.id}>
								<DoubleCard imageURL={track.album.images[1].url} itemName={track.name} subItem={track.artists}/>
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

export default TopTracks