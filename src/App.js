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

  const [bill, setBill] = useState('monthly');
  const [slider, setSlider] = useState(false)

  const [arcadeBill, setArcadeBill] = useState(null);
  const [advancedBill, setAdvancedBill] = useState(null);
  const [proBill, setProBill] = useState(null);

  const [activeInput, setActiveInput] = useState('');
  const [activeBillPlan, setActiveBillPlan] = useState('')
  console.log(activeBillPlan)

  useEffect(() => {
    if(bill === 'monthly'){
      setArcadeBill(9);
      setAdvancedBill(12);
      setProBill(15);
    }else if(bill === 'yearly'){
      setArcadeBill(90);
      setAdvancedBill(120);
      setProBill(150);
    }
  })

  const nameCheck = /^[a-zA-Z]+$/
  const phoneCheck = /^\+380\d{9}$/;
  const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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

  }

  const changeBill = () => {
    if(bill === 'monthly'){
      setBill('yearly')
    }else{
      setBill('monthly')
    }
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
                <div className={navigation === 'add-ons' ? 'form-block__nav_menu_first-page_number-active' : 'form-block__nav_menu_first-page_number-inactive'}>3</div>
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
                          onClick={() => setActiveBillPlan('arcade')}>
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
                          onClick={() => setActiveBillPlan('advanced')}>
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
                          onClick={() => setActiveBillPlan('pro')}>
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
                        <div className='wrapper-selectPlan-block__content_block-bill_arcade-block'>
                          <div className='wrapper-selectPlan-block__content_block-bill_arcade-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_img' src={arcade}></img>
                            <div className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_info'>
                              <h4>Arcade</h4>
                              <p>${arcadeBill}/yr</p>
                              <span className='wrapper-selectPlan-block__content_block-bill_arcade-block_description_info_bonus'>2 months free</span>
                            </div>
                          </div>
                        </div>
                        <div className='wrapper-selectPlan-block__content_block-bill_advanced-block'>
                          <div className='wrapper-selectPlan-block__content_block-bill_advanced-block_description'>
                            <img className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_img' src={advanced}></img>
                            <div className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_info'>
                              <h4>Advanced</h4>
                              <p>${advancedBill}/yr</p>
                              <span className='wrapper-selectPlan-block__content_block-bill_advanced-block_description_info_bonus'>2 months free</span>
                            </div>
                          </div>
                        </div>
                        <div className='wrapper-selectPlan-block__content_block-bill_pro-block'>
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
          </div>
        </div>
      </div>
  );
}

export default App;
