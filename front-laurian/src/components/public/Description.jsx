function Description() {
  return (
    <section
      className="main-container description-section homepage-section"
      id="presentation"
    >
      <h2>présentation du concours</h2>
      <div className="img-container">
        <img src="/images/presentation-img.png" alt="image-presentation" />
      </div>
      <p>
        Gratuit et accessible à tous, le concours MyPhotos a pour vocation de
        mettre en lumière les talents de photographes amateurs passionnés tout
        en capturant la splendeur du monde qui nous entoure.
      </p>
      <br />
      <p>Le thème de cette année est :</p>
      <p>
        <span className="green bold">LA NATURE DANS TOUS SES ÉTATS</span>
      </p>
      <br />
      <p>
        Les trois photographies récoltant le plus de votes se verront recevoir
        un bon d'achat ainsi que du matériel photographique. MyPhotos vous
        convie cordialement à prendre part à cette occasion unique de célébrer
        la beauté de notre planète et de la retranscrire à travers l'objectif de
        votre appareil photo. Que ce soit la poésie des petits détails du
        quotidien, les vastes étendues, les prises de vue aériennes, ou encore
        les catégories de Nature, Paysage, Animaux, Voyage & Culture, toutes
        sont les bienvenues.
      </p>
      <br />
      <p>
        Vous avez jusqu'au <span className="bold">30 octobre 2023 minuit</span>{" "}
        pour participer.
      </p>
    </section>
  );
}

export default Description;
