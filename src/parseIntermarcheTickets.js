const parseIntermarcheTickets = (str) => {

  const splittedString = str.split("\n")[0].split("\\n");

  // ON VA CHERCHER L'INDEX DU PREMIER PRIX DE LA COLONNE "EUR"
  const priceListStart = splittedString.indexOf("EUR") + 1;

  // ON VA CHERCHER L'INDEX DU DERNIER PRIX DE LA COLONNE "EUR"
  const priceListEnd = splittedString.indexOf("TOTAL");


  const getnumberOfProducts = (splittedString) => {

    // CETTE VARIABLE REPRESENTE LE NOMBRE DE LIGNES DE LA COLONNE "EUR" à IGNORER (LIGNES DE TOTAL EN BAS DU TICKET)
    let totalLinesNumber = 2

    // SI  UNE LIGNE DE TOTAL AFFICHE LE MONTANT EN FRANCS (FRF), UNE LIGNE DE PLUS EST À IGNORER
    if(splittedString.includes("FRF")) {
      totalLinesNumber += 1
    }

    return priceListEnd - priceListStart - totalLinesNumber
  }

  const numberOfProducts = getnumberOfProducts(splittedString);

  const prices = splittedString.slice(priceListStart, priceListStart + numberOfProducts);
  //DOIT RETOURNER UN ARRAY DE PRICES DANS L'ORDRE D'APPARITION DES PRODUITS


  let products = [];
  let productsCounter = 0;
  const pricesInReversedOrder = prices.reverse();

  splittedString.slice(0, priceListStart - 1) // ON SELECTIONNE L'ARRAY SPLITTED STRING DEPUIS LE DEBUT DU TICKET JUSQU'A LA FIN DE LA LISTE DE PRODUITS
                .reverse() // ON INVERSE LE SENS DE L'ARRAY SELECTIONNÉ (NOUS COMMENCERONS PAR LA FIN DE LA LISTE DE PRODUITS)
                .forEach((element, index) => {
                  if (element.startsWith("QTEM")) {
                    // ON REPÈRE LES LIGNES SE SITUANT SOUS LES NOMS DE PRODUITS QUI SPECIFIENT LEUR QUANTITÉ SI ELLE EST > 1
                    const quantity = parseInt(str.split("x")[0].match(/(\d+)/)[0]); // extract numbers from the first part of the string
                    // ON EXTRAIT LA QUANTITÉ INDIQUÉE ET ON CRÉE LE PROCHAIN OBJET PRODUCT AVEC CETTE QUANTITÉ
                    products.unshift({
                      quantity,
                      name: "",
                      unit_price: ""
                    }); // la fonction unshift() insère l'élément au début de l'array
                  } else if (productsCounter < numberOfProducts) {
                    if (products[0] && products[0].name === "") {
                      // SI LE DERNIER PRODUIT INSÉRÉ AU DÉBUT L'ARRAY N'A QU'UNE QUANTITÉ (PAS DE NOM NI PRIX) ON SPÉCIFIE LE NOM ET LE PRIX
                      const product = products.shift();
                      product.name = element;
                      product.unit_price = Math.round(pricesInReversedOrder[productsCounter] / product.quantity * 100) / 100; // round with two digits after comma
                      products.unshift(product);
                      productsCounter +=1;
                    }else{
                      // SINON ON CRÉE UN PRODUIT AVEC UNE QUANTITÉ DE 1
                      products.unshift({
                        name: element,
                        unit_price: pricesInReversedOrder[productsCounter],
                        quantity: 1
                      });
                      productsCounter +=1;
                    }
                  }
                });

  return {
    numberOfProducts,
    products
  };
}
