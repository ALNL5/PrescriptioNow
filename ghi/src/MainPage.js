function MainPage() {
  return (
    <div className="container">
      <div className="row gx-4 p-5 mb-5 hero">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <h1>Prescriptions delivered to you</h1>
          <p>Get refills without leaving home</p>
          <p></p>
          <div className="mt-5">
            <p>
              <a
                className="btn btn-lg"
                href="prescriptionow/accounts/login"
                role="button"
              >
                Login
              </a>
            </p>
            <p>
              <a
                className="btn btn-lg"
                href="prescriptionow/accounts/signup"
                role="button"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="row gx-5 p-3">
        <div className="col-md-8">
          <h2>Rx refills when you need them</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
            suscipit deleniti quas explicabo hic. Nostrum, temporibus fugiat
            debitis sunt, dolores sapiente pariatur reiciendis amet voluptatum
            quaerat exercitationem tempore, id error. Debitis molestiae commodi
            unde libero, aut quidem, iusto, numquam corporis incidunt ratione
            quam. Totam nulla ullam repudiandae ipsam sunt veritatis ducimus? Id
            aut, libero veniam beatae necessitatibus architecto explicabo earum?
          </p>
          <p>
            Mattis vulputate enim nulla aliquet. Cursus in hac habitasse platea
            dictumst quisque. Viverra vitae congue eu consequat ac. Integer
            malesuada nunc vel risus commodo viverra. Fames ac turpis egestas
            integer eget. Eu sem integer vitae justo eget magna fermentum. Sed
            viverra ipsum nunc aliquet. Venenatis tellus in metus vulputate eu.
          </p>
        </div>
        <div className="col-md-4">
          <h3>Bottom right section</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, doloribus at. Temporibus nobis corporis quisquam. Quod
            omnis qui fugiat quibusdam expedita ut commodi animi ea modi
            ratione? Unde, molestias quos?
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
