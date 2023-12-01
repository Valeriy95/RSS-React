import { useSelector } from "react-redux"
import { RootState } from "../slices/appSlice"

function FinishForm () {
    // const dispatch = useDispatch()
    // let countries = useSelector((state: RootState) => state.app.countries)
    // const countriesTest = useSelector(
    //   (state: RootState) => state.app.countriesTest,
    // )

    const name = useSelector((state: RootState) => state.app.name)
    const age = useSelector((state: RootState) => state.app.age)
    const email = useSelector((state: RootState) => state.app.email)
    const password = useSelector((state: RootState) => state.app.password)
    const passwordDub = useSelector((state: RootState) => state.app.passwordDub)
    const gender = useSelector((state: RootState) => state.app.gender)
    const termsAccepted = useSelector((state: RootState) => state.app.termsAccepted)
    const country = useSelector((state: RootState) => state.app.country)
    const image = useSelector((state: RootState) => state.app.image)

    return (
        <div className='list-container'>
          <form>
            <div className="item-container">
              <div className='item-wrapper'>
              <label htmlFor="yourName" className='title'>Name:</label>
              <input
              disabled
              value={name}
                type="text"
                id="yourName"
                name="yourName"
              /> 
              </div>
            </div>
    
            <div className="item-container">
            <div className='item-wrapper'>
            <label htmlFor="yourAge" className='title'>Age:</label>
              <input
              disabled
                value={age}
                type="number"
                id="yourAge"
                name="yourAge"
              />
            </div>
            </div>
    
            <div className="item-container">
              <div className='item-wrapper'>
              <label htmlFor="yourEmail" className='title'>Email:</label>
              <input
              disabled
                 value={email}
                type="email"
                id="yourEmail"
                name="yourEmail"
              />
              </div>
            </div>
    
            <div className="item-container">
              <div className='item-wrapper'>
              <label htmlFor="yourPassword" className='title'>Password:</label>
              <input
              disabled
                value={password}
                type="password"
                id="yourPassword"
                name="yourPassword"
              />
              </div>
            </div>
    
            <div className="item-container">
              <div className='item-wrapper'>
              <label htmlFor="yourPasswordDub" className='title'>Repeat password:</label>
              <input
              disabled
                value={passwordDub}
                type="password"
                id="yourPasswordDub"
                name="yourPasswordDub"
              />
              </div>
            </div>
    
            <div className="item-container">
              <div className='item-wrapper'>
              <label className='title'>Gender:</label>
                <input
                disabled
                value={gender}
                type="text"
                name="gender" 
                />
              </div>
            </div>
    
            <div className="item-container">
              <div>
                <input
                disabled
                  type="checkbox"
                    checked={termsAccepted}
                />
              <label className='title'>
                Принять условия и положения
              </label>
              </div>
            </div>
    
            <div className="item-container">
              <img className="image-container" src={image} alt="image" />
            </div>
    
            <div className="item-container list-countries">
              <div className='item-wrapper'>
              <label htmlFor="country" className='title'>Country:</label>
              <input
              disabled
                type="text"
                id="country"
                value={country}
              />
              </div>
            </div>
          </form>
        </div>
      )
}  


export default FinishForm