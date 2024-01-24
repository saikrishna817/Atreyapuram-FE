import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  faqData = [
    {
      question: "WHAT IS PUTHAREKULU OR PAPER SWEET?",
      answer: "Pootharekulu, also spelt as Putharekulu, is a traditional Indian sweet delicacy hailing from the Atreyapuram Village of the state of Andhra Pradesh. It is known for its unique and intricate preparation process. Because it hails from the village Atreyapuram, the sweet is also known as Atreyapuram Putharekulu or Athreyapuram Pootharekulu.Atreyapuram Pootharekulu, also known as paper sweet is made by rolling rice starch batter into thin sheets and then layering them with a filling of powdered sugar, ghee (clarified butter), and sometimes, cardamom or dry fruits. These delicate rolls are then sun-dried and preserved. The result is a crispy, flaky treat with a sweet and buttery taste that melts in your mouth.Athreyapuram Pootharekulu has gained popularity not only in Andhra Pradesh but also across India and has become a symbol of the region's culinary heritage.",
      isOpen: false
    },
    {
      question: "HOW MANY TYPES OF PUTHAREKULU ARE THERE?",
      answer: "There are various types of Putharekulu available, each with its own distinct flavors and fillings. The traditional Putharekulu features a filling of powdered sugar or powdered jaggery and ghee, offering a delightful combination of sweetness and richness.Additionally, there are variations like the Cashew Putharekulu, where crunchy cashew nuts are added to the filling, enhancing the texture and taste.The sweet is also filled with roasted almonds and pistachios.For those who enjoy a touch of fruitiness, Dry Fruit Putharekulu with its mix of dried fruits like almonds, pistachios, and cashew, provides a delectable twist.If you want to savor the best Putharekulu in all its varieties, look no further than the website atpu.in.We offer a wide range of Putharekulu, ensuring the highest quality and authentic taste.Explore the diverse options and have these delightful treats delivered right to your doorstep.",
      isOpen: false
    },
    {
      question: "WHAT IS PREPARATION PROCESS OF ATREYAPURAM PUTHAREKULU SWEET?",
      answer: "Atreyapuram Pootharekulu, a traditional Indian sweet from Andhra Pradesh, is prepared through a meticulous process.First, a thin batter is made by grinding rice into a fine powder and mixing it with water. The batter is then strained to remove any lumps. Next, a small amount of this batter is spread evenly on a heated pot, creating a thin layer.Once the layer is cooked, it is carefully peeled off and set aside. This process is repeated to create multiple thin layers. Each layer is then filled with a mixture of powdered sugar/jaggery, ghee (clarified butter), and dry fruits.The layers are stacked on top of one another, creating a roll. Finally, the rolls are left to dry in the sun, allowing them to become crisp and firm. The end result is a delectable treat with a unique texture and sweet flavor.",
      isOpen: false
    },
    {
      question: "HOW CAN I BUY ATREYAPURAM PUTHAREKULU SWEET ONLINE?",
      answer: "Fortunately, you are on the right place to buy Putharekulu sweet online. We sell the finest paper sweet available in the country. Backed by expert cooks and finest ingredients, our sweets are one of the best that are available in the market right now. Order now and taste for yourself.",
      isOpen: false
    },
    {
      question: "WHERE CAN I BUY ATREYAPURAM PUTHAREKULU SWEET NEAR ME?",
      answer: "If you are looking to buy Atreyapuram Pootharekulu Sweet near your location, the best option is to visit the website atreyapuram.com. atreyapuram is a renowned brand known for its authentic and delicious sweets Pootharekulu.Our website offers a convenient way to purchase these delectable treats from the comfort of your home. With just a few clicks, you can explore their wide range of sweets, including the famous Pootharekulu, and place an order for delivery to your doorstep.We ensure the highest quality and freshness of the sweets, making it a reliable source for satisfying your craving for these traditional Andhra Pradesh delicacies.",
      isOpen: false
    },
  ];

  toggleCollapse(index: number) {
    this.faqData[index].isOpen = !this.faqData[index].isOpen;
  }
}
