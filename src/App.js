import { useEffect, useState } from 'react';
import './App.scss';
import menu from './images/bg-sidebar-desktop.svg'
import arcade from './images/icon-arcade.svg'
import advanced from './images/icon-advanced.svg'
import pro from './images/icon-pro.svg'

function App() {

  const [navigation, setNavigation] = useState('personal info');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [activeInput, setActiveInput] = useState('');

  const [bill, setBill] = useState('monthly');
  const [slider, setSlider] = useState(false)

  const [arcadeBill, setArcadeBill] = useState(null);
  const [advancedBill, setAdvancedBill] = useState(null);
  const [proBill, setProBill] = useState(null);
  const [plan, setPlan] = useState('');
  const [activeBillPlan, setActiveBillPlan] = useState('')
  const [billPrice, setBillPrice] = useState(null)

  const [onlineService, setOnlineService] = useState(null);
  const [largerStorage, setLargerStorage] = useState(null);
  const [customProfile, setCustomProfile] = useState(null);
  const [activeBlock, setActiveBlock] = useState([]);
  const [cost, setCost] = useState([]);

  const nameCheck = /^[a-zA-Z]+$/
  const phoneCheck = /^\+380\d{9}$/;
  const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  useEffect(() => {
    if(bill === 'monthly'){
      setArcadeBill(9);
      setAdvancedBill(12);
      setProBill(15);
    }else if(bill === 'yearly'){
      setArcadeBill(90);
      setAdvancedBill(120);
      setProBill(150);
    }/*if(activeBillPlan === 'arcade') {
      setBill(bill === 'yearly' ? arcadeBill : arcadeBill * 10); // Обновление цены для Arcade в зависимости от пакета
    }else if(activeBillPlan === 'advanced'){
      setBill(bill === 'yearly' ? advancedBill : advancedBill * 10)
    }else if(activeBillPlan === 'pro'){
      setBill(bill === 'yearly' ? proBill : proBill * 10)
    }*/
  }, [bill, activeBillPlan, arcadeBill, advancedBill, proBill]);

  useEffect(() => {
    if(bill === 'monthly'){
      setOnlineService(1)
      setLargerStorage(2)
      setCustomProfile(2)
    }else if(bill === 'yearly'){
      setOnlineService(10)
      setLargerStorage(20)
      setCustomProfile(20)
    }
  }, [bill])

  const navFirstPage = () => {
    setNameError('');
    setEmailError('');
    setPhoneError('');
  
    let isValid = true; 
  
    if (name === '') {
      setNameError('This field is required');
      isValid = false; 
    } else if (!nameCheck.test(name)) {
      setNameError('Field must contain only letters');
      isValid = false;
    }

    if (email === '') {
      setEmailError('This field is required');
      isValid = false; 
    }else if(!emailCheck.test(email)){
      setEmailError('This field contains an invalid email.');
      isValid = false
    }

    if (phone === '') {
      setPhoneError('This field is required');
      isValid = false; 
    }else if(!phoneCheck.test(phone)){
      setPhoneError('This field contains an invalid phone number.')
      isValid = false
    }
  
    if (isValid) {
      setNavigation('select plan');
    }
  }

  const backFirstPage = () => {
    setNavigation('personal info');
  }

  const thirdPage = () => {
    if(billPrice === null){
      setPlan('Please, choise bill plan')
    }else{
      setPlan('')
      setNavigation('add ons')
    }
  }

  const fourthPage = () => {
    setNavigation('summary')
  }

  const changeBill = () => {
    if(bill === 'monthly'){
      setBill('yearly')
    }else{
      setBill('monthly')
    }
  }

  const planSelection = (selectedPlan, billAmount) => {
    setActiveBillPlan(selectedPlan);
    setBillPrice(billAmount);
  }

  const getActiveBlock = (block, price) => {
    if(activeBlock.includes(block)){
      setActiveBlock(activeBlock.filter(item => item !== block))
      setCost(cost.filter(item => item !== price))
    }else{
      setActiveBlock([...activeBlock, block])
      setCost([...cost, price])
    }
  }

  const sum = cost.reduce((start, value) => start + value, 0);
  const fullPrise = sum + billPrice

  const backOnTwoPage = () => {
    setNavigation('select plan')
  }

  return (
    <div className='wrapper'>
      <div className='main-block'>
        <div className='form-block'>
          <div className='form-block__nav'>
            <img className='form-block__nav_img' src={menu}></img>
            <div className='form-block__nav_menu'>
              <div className='form-block__nav_menu_first-page'>
                <div className={navigation === 'personal info' ? 'form-block__nav_menu_first-page_number-active' : 'form-block__nav_menu_first-page_number-inactive'}>1</div>
                <div className='form-block__nav_menu_first-page_block-step'>
                  <p className='form-block__nav_menu_first-page_block-step_step'>step 1</p>
                  <p className='form-block__nav_menu_first-page_block-step_text'>your info</p>
                </div>
              </div>
              <div className='form-block__nav_menu_second-page'>
                <div className={navigation === 'select plan' ? 'form-block__nav_menu_first-page_number-active' : 'form-block__nav_menu_first-page_number-inactive'}>2</div>
                <div className='form-block__nav_menu_first-page_block-step'>
                  <p className='form-block__nav_menu_first-page_block-step_step'>step 2</p>
                  <p className='form-block__nav_menu_first-page_block-step_text'>select plan</p>
                </div>
              </div>
              <div className='form-block__nav_menu_third-page'>
                <div className={navigation === 'add ons' ? 'form-block__nav_menu_first-page_number-active' : 'form-block__nav_menu_first-page_number-inactive'}>3</div>
                <div className='form-block__nav_menu_first-page_block-step'>
                  <p className='form-block__nav_menu_first-page_block-step_step'>step 3</p>
                  <p className='form-block__nav_menu_first-page_block-step_text'>add-ons</p>
                </div>
              </div>
              <div className='form-block__nav_menu_fourth-page'>
                <div className={navigation === 'summary' ? 'form-block__nav_menu_first-page_number-active' : 'form-block__nav_menu_first-page_number-inactive'}>4</div>
                <div className='form-block__nav_menu_first-page_block-step'>
                  <p className='form-block__nav_menu_first-page_block-step_step'>step 4</p>
                  <p className='form-block__nav_menu_first-page_block-step_text'>summary</p>
                </div>
              </div>
            </div>
          </div>

            {navigation === 'personal info' && (
              <div className='wrapper-personal-block'>
                <div className='wrapper-personal-block__content'>
                  <h1 className='wrapper-personal-block__content_title'>Personal info</h1>
                  <p className='wrapper-personal-block__content_description'>Please provide your name, email address, and phone number.</p>
                  <div className='wrapper-personal-block__content_block-name'>
                    <div className='wrapper-personal-block__content_block-name_title'>
                      <p className='wrapper-personal-block__content_block-name_title_text'>Name</p>
                      <p className='wrapper-personal-block__content_block-name_title_error'>{nameError}</p>
                    </div>
                    <input 
                      className={
                        (nameError !== '' ? 'wrapper-personal-block__content_block-name_name-error' : 'wrapper-personal-block__content_block-name_entered') +
                        ' ' +
                        (activeInput === 'name' ? 'input-active' : '')
                      }
                      type='text'
                      placeholder='e. g. John Piters'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setActiveInput('name')}
                      onBlur={() => setActiveInput('')}
                    ></input>
                  </div>
                  <div className='wrapper-personal-block__content_block-email'>
                    <div className='wrapper-personal-block__content_block-email_title'>
                      <p className='wrapper-personal-block__content_block-email_title_text'>Email Address</p>
                      <p className='wrapper-personal-block__content_block-email_title_error'>{emailError}</p>
                    </div>
                    <input 
                      className={
                        (emailError !== '' ? 'wrapper-personal-block__content_block-email_email-error' : 'wrapper-personal-block__content_block-email_entered') + 
                        ' ' +
                        (activeInput === 'email' ? 'input-active' : '')
                    }
                      type='email'
                      placeholder='e. g. email@gmail.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() =>setActiveInput('email')}
                      onBlur={() => setActiveInput()}
                    ></input>
                  </div>
                  <div className='wrapper-personal-block__content_block-phone'>
                    <div className='wrapper-personal-block__content_block-phone_title'>
                      <p className='wrapper-personal-block__content_block-phone_title_text'>Email Address</p>
                      <p className='wrapper-personal-block__content_block-phone_title_error'>{phoneError}</p>
                    </div>
                    <input 
                      className={
                        (phoneError !== '' ? 'wrapper-personal-block__content_block-phone_phone-error' : 'wrapper-personal-block__content_block-phone_entered') + 
                        ' ' + 
                        (activeInput === 'phone' ? 'input-active' : '')
                    }
                      type='phone'
                      placeholder='e.g. +1 234 567 890'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => setActiveInput('phone')}
                      onBlur={() => setActiveInput('')}
                    ></input>
                  </div>
                  <button className='wrapper-personal-block__content_btn' onClick={navFirstPage}>Next Step</button>
                </div>
              </div>
            )}

            {navigation === 'select plan' && (
              <div className='wrapper-selectPlan-block'>
                <div className='wrapper-selectPlan-block__content'>
                  <h1 className='wrapper-selectPlan-block__content_title'>Select your plan</h1>
                  <p className='wrapper-selectPlan-block__content_description'>You have the option of monthly or yearly billing</p>
                  <div className='wrapper-selectPlan-block__content_block-bill'>
                    
                    {navigation === 'select plan' && bill === 'monthly' && (
                      <>
                        <div 
                          className={`wrapper-selectPlan-block__content_block-bill_arcade-block ${activeBillPlan === 'arcade' ? 'selected' : ''}`}
                          onClick={() => planSelection('arcade', arcadeBill)}>
                          <div className='wrapper-selectPlan-block__content_block-bill_arcade-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_img' src={arcade}></img>
                            <div className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_info'>
                              <h4>Arcade</h4>
                              <p>${arcadeBill}/mo</p>
                            </div>
                          </div>
                        </div>
                        <div 
                          className={`wrapper-selectPlan-block__content_block-bill_advanced-block ${activeBillPlan === 'advanced' ? 'selected' : ''}` }
                          onClick={() => planSelection('advanced', advancedBill)}>
                          <div className='wrapper-selectPlan-block__content_block-bill_advanced-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_img' src={advanced}></img>
                              <div className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_info'>
                                <h4>Advanced</h4>
                                <p>${advancedBill}/mo</p>
                              </div>
                          </div>
                        </div>
                        <div 
                          className={`wrapper-selectPlan-block__content_block-bill_pro-block ${activeBillPlan === 'pro' ? 'selected' : ''}`} 
                          onClick={() => planSelection('pro', proBill)}>
                          <div className='wrapper-selectPlan-block__content_block-bill_pro-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_pro-block_description_img' src={pro}></img>
                              <div className='wrapper-selectPlan-block__content_block-bill_pro-block_description_info'>
                                <h4>Pro</h4>
                                <p>${proBill}/mo</p>
                              </div>
                          </div>
                        </div>
                      </>
                    )}

                    {navigation === 'select plan' && bill === 'yearly' && (
                      <>
                        <div 
                          className={`wrapper-selectPlan-block__content_block-bill_arcade-block ${activeBillPlan === 'arcade' ? 'selected' : ''}`}
                          onClick={() => planSelection('arcade', arcadeBill)}
                        >
                          <div className='wrapper-selectPlan-block__content_block-bill_arcade-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_img' src={arcade}></img>
                            <div className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_info'>
                              <h4>Arcade</h4>
                              <p>${arcadeBill}/yr</p>
                              <span className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_info_bonus'>2 months free</span>
                            </div>
                          </div>
                        </div>
                        <div 
                          className={`wrapper-selectPlan-block__content_block-bill_advanced-block ${activeBillPlan === 'advanced' ? 'selected' : ''}`}
                          onClick={() => planSelection('advanced', advancedBill)}  
                        >
                          <div className='wrapper-selectPlan-block__content_block-bill_advanced-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_img' src={advanced}></img>
                            <div className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_info'>
                              <h4>Advanced</h4>
                              <p>${advancedBill}/yr</p>
                              <span className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_info_bonus'>2 months free</span>
                            </div>
                          </div>
                        </div>
                        <div 
                          className={`wrapper-selectPlan-block__content_block-bill_pro-block ${activeBillPlan === 'pro' ? 'selected' : ''}`}
                          onClick={() =>planSelection('pro', proBill)}  
                        >
                          <div className='wrapper-selectPlan-block__content_block-bill_pro-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_pro-block_description_img' src={pro}></img>
                            <div className='wrapper-selectPlan-block__content_block-bill_pro-block_description_info'>
                              <h4>Pro</h4>
                              <p>${proBill}/yr</p>
                              <span className='wrapper-selectPlan-block__content_block-bill_pro-block_description_info_bonus'>2 months free</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                  </div>
                  <div className='wrapper-selectPlan-block__content_change-bill'>
                    <div className={bill === 'monthly' ? 'wrapper-selectPlan-block__content_change-bill_month-active' : 'wrapper-selectPlan-block__content_change-bill_month-inactive'}>Monthly</div>
                    <div 
                      onClick={changeBill} 
                      className='wrapper-selectPlan-block__content_change-bill_slider'>
                        <div className={bill === 'monthly' ? 'wrapper-selectPlan-block__content_change-bill_slider_circle-monthly' : 'wrapper-selectPlan-block__content_change-bill_slider_circle-yearly'}></div>
                    </div>
                    <div className={bill === 'yearly' ? 'wrapper-selectPlan-block__content_change-bill_year-active' : 'wrapper-selectPlan-block__content_change-bill_year-inactive'}>Yearly</div>
                  </div>
                  <div className='wrapper-selectPlan-block__content_error'>
                    {plan}
                  </div>
                  <div className='wrapper-selectPlan-block__content_next-back'>
                    <button 
                      onClick={backFirstPage} 
                      className = 'wrapper-selectPlan-block__content_next-back_back'
                    >Go Back</button>
                    <button 
                      onClick={thirdPage} 
                      className = 'wrapper-selectPlan-block__content_next-back_next'
                    >Next Step</button>
                  </div>
                </div>
              </div>
              
            )}

            {navigation === 'add ons' && (
              <>
                <div className='wrapper-addOns-block'>
                  <div className='wrapper-addOns-block__content'>
                    <h1 className='wrapper-addOns-block__content_title'>Pick add-ons</h1>
                    <p className='wrapper-addOns-block__content_description'>Add-ons help enhance your gaming experience</p>
                    <div className='wrapper-addOns-block__content_block-bill'>

                      {navigation === 'add ons' && bill === 'monthly' && (
                        <div className='wrapper-addOns-block__content_block-bill_monthly-block'>
                          <div 
                            className={`wrapper-addOns-block__content_block-bill_monthly-block_first ${activeBlock.includes('onlineService') ? 'selected-pickOns': ''}`}
                            onClick={() => getActiveBlock('onlineService', onlineService)}
                          >
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_first_check'>
                              {activeBlock.includes('onlineService') ? <div className='wrapper-addOns-block__content_block-bill_monthly-block_first_check_box-active'></div> : <div className='wrapper-addOns-block__content_block-bill_monthly-block_first_check_box'></div>}
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_first_text-info'>
                              <p className='wrapper-addOns-block__content_block-bill_monthly-block_first_text-info_title'>Online service</p>
                              <p className='wrapper-addOns-block__content_block-bill_monthly-block_first_text-info_text'>Access to multiplayer games</p>
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_first_price'>+${onlineService}/mo</div>
                          </div>

                          <div 
                            className={`wrapper-addOns-block__content_block-bill_monthly-block_second ${activeBlock.includes('largerStorage') ? 'selected-pickOns' : ''}`}
                            onClick={() => getActiveBlock('largerStorage', largerStorage)}
                          >
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_second_check'>
                            {activeBlock.includes('largerStorage') ? <div className='wrapper-addOns-block__content_block-bill_monthly-block_second_check_box-active'></div> : <div className='wrapper-addOns-block__content_block-bill_monthly-block_second_check_box'></div>}
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_second_text-info'>
                              <p className='wrapper-addOns-block__content_block-bill_monthly-block_second_text-info_title'>Larger Storage</p>
                              <p className='wrapper-addOns-block__content_block-bill_monthly-block_second_text-info_text'>Extra 1TB of cloud save</p>
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_second_price'>
                              +${largerStorage}/mo
                            </div>
                          </div>

                          <div 
                            className={`wrapper-addOns-block__content_block-bill_monthly-block_third ${activeBlock.includes('customProfile') ? 'selected-pickOns' : ''}`}
                            onClick={() => getActiveBlock('customProfile', customProfile)}
                          >
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_third_check'>
                              {activeBlock.includes('customProfile') ? <div className='wrapper-addOns-block__content_block-bill_monthly-block_third_check_box-active'></div> : <div className='wrapper-addOns-block__content_block-bill_monthly-block_third_check_box'></div>}
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_third_text-info'>
                              <p className='wrapper-addOns-block__content_block-bill_monthly-block_third_text-info_title'>Customizable Profile</p>
                              <p className='wrapper-addOns-block__content_block-bill_monthly-block_third_text-info_text'>Custom theme on your profile</p>
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_third_price'>+${customProfile}/mo</div>
                          </div>
                        </div>
                      )}

                      {navigation === 'add ons' && bill === 'yearly' && (
                        <div className='wrapper-addOns-block__content_block-bill_yearly-block'>
                          <div 
                            className={`wrapper-addOns-block__content_block-bill_yearly-block_first ${activeBlock.includes('onlineService') ? 'selected-pickOns': ''}`}
                            onClick={() => getActiveBlock('onlineService', onlineService)}
                          >
                            <div className='wrapper-addOns-block__content_block-bill_yearly-block_first_check'>
                              {activeBlock.includes('onlineService') ? <div className='wrapper-addOns-block__content_block-bill_yearly-block_first_check_box-active'></div> : <div className='wrapper-addOns-block__content_block-bill_yearly-block_first_check_box'></div>}
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_yearly-block_first_text-info'>
                              <p className='wrapper-addOns-block__content_block-bill_yearly-block_first_text-info_title'>Online service</p>
                              <p className='wrapper-addOns-block__content_block-bill_yearly-block_first_text-info_text'>Access to multiplayer games</p>
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_first_price'>+${onlineService}/yr</div>
                          </div>

                          <div 
                            className={`wrapper-addOns-block__content_block-bill_yearly-block_second ${activeBlock.includes('largerStorage') ? 'selected-pickOns' : ''}`}
                            onClick={() => getActiveBlock('largerStorage', largerStorage)}
                          >
                            <div className='wrapper-addOns-block__content_block-bill_yearly-block_second_check'>
                            {activeBlock.includes('largerStorage') ? <div className='wrapper-addOns-block__content_block-bill_yearly-block_second_check_box-active'></div> : <div className='wrapper-addOns-block__content_block-bill_yearly-block_second_check_box'></div>}
                            </div>
                            <div>
                              <p className='wrapper-addOns-block__content_block-bill_yearly-block_second_text-info_title'>Larger Storage</p>
                              <p className='wrapper-addOns-block__content_block-bill_yearly-block_second_text-info_text'>Extra 1TB of cloud save</p>
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_second_price'>
                              +${largerStorage}/yr
                            </div>
                          </div>

                          <div 
                            className={`wrapper-addOns-block__content_block-bill_yearly-block_third ${activeBlock.includes('customProfile') ? 'selected-pickOns' : ''}`}
                            onClick={() => getActiveBlock('customProfile', customProfile)}
                          >
                            <div className='wrapper-addOns-block__content_block-bill_yearly-block_third_check'>
                              {activeBlock.includes('customProfile') ? <div className='wrapper-addOns-block__content_block-bill_yearly-block_third_check_box-active'></div> : <div className='wrapper-addOns-block__content_block-bill_yearly-block_third_check_box'></div>}
                            </div>
                            <div>
                              <p className='wrapper-addOns-block__content_block-bill_yearly-block_third_text-info_title'>Customizable Profile</p>
                              <p className='wrapper-addOns-block__content_block-bill_yearly-block_third_text-info_text'>Custom theme on your profile</p>
                            </div>
                            <div className='wrapper-addOns-block__content_block-bill_monthly-block_third_price'>+${customProfile}/yr</div>
                          </div>
                      </div>
                      )}

                    </div>
                    <div className='wrapper-addOns-block__content_next-back'>
                      <button
                        className='wrapper-addOns-block__content_next-back_back'
                        onClick={backOnTwoPage}
                      >Go back
                      </button>
                      <button
                        onClick={fourthPage}
                        className='wrapper-addOns-block__content_next-back_next'
                      >Next Step
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {navigation === 'summary' && (
              <>
                <p>sum: {fullPrise}</p>
              </>
            )}
          </div>
        </div>
      </div>
  );
}

export default App;
