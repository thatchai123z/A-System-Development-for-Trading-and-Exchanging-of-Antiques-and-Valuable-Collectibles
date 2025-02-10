import React from 'react'

function SelectExchange() {
    return (
        <div className='slproduct'>
            <div className='con-slproduct'>
                <div className='slproduct-img'>
                    <img src="/images/p1.png" alt="" />
                </div>
                <div className='slproduct-info'>
                    <h1>Ring</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat soluta
                        dolorem architecto sunt excepturi temporibus eum et quisquam! Voluptatem
                        veritatis sit cumque ad magnam consequuntur laudantium temporibus,
                        voluptates quidem, nam suscipit blanditiis, minus quisquam voluptas sequi
                        hic aliquid at nisi? Delectus dicta ipsa voluptas cupiditate, maxime quaerat
                        sint labore accusamus aliquam aspernatur harum modi consectetur necessitatibus
                        nulla aperiam, architecto error iste ea obcaecati, eum quos commodi
                        dignissimos iure facilis! Reiciendis itaque laudantium deserunt, hic
                        magnam placeat quod, perspiciatis nemo sequi mollitia magni quaerat pariatur
                        cum sit at, sunt provident! Ipsum consequatur laborum molestiae possimus.
                        Reprehenderit neque necessitatibus fuga dicta itaque?</p>
                </div>
                <form action="" className='form-exchange'>
                    <input type="file" id='file' about='/images/*' />
                    <label for='file'>
                        Choose a offer images
                    </label>
                    <div className='offer-img'>
                        <div className="con-offer-img">
                            <img src="/images/p1.png" alt="" />
                        </div>
                        <div className="con-offer-img">
                            <img src="/images/p2.png" alt="" />
                        </div>
                        <div className="con-offer-img">
                            <img src="/images/p3.png" alt="" />
                        </div>
                        <div className="con-offer-img">
                            <img src="/images/p4.png" alt="" />
                        </div>
                        <div className="con-offer-img">
                            <img src="/images/p5.png" alt="" />
                        </div>
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default SelectExchange