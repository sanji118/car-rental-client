import { Car } from "lucide-react"
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"


const Footer = () => {
  return (
    <footer>
      <div class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <nav>
          <h6 class="footer-title">Services</h6>
          <a class="link link-hover">Pricing</a>
          <a class="link link-hover">Design</a>
          <a class="link link-hover">Marketing</a>
          <a class="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 class="footer-title">Company</h6>
          <a class="link link-hover">About us</a>
          <a class="link link-hover">Contact</a>
          <a class="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 class="footer-title">Legal</h6>
          <a class="link link-hover">Terms of use</a>
          <a class="link link-hover">Privacy policy</a>
          <a class="link link-hover">Cookie policy</a>
        </nav>
      </div>
      <div class="footer sm:footer-horizontal bg-neutral text-neutral-content p-8">
        <aside>
          <Car></Car>
          <p>
            DriveRental
            <br />
            Providing reliable cars since 1992
          </p>
        </aside>
        <nav>
          <h6 class="footer-title">Social</h6>
          <div class="grid grid-flow-col gap-4 text-4xl text-pink-400">
            <FaFacebook ></FaFacebook>
            <FaInstagram></FaInstagram>
            <FaTwitter></FaTwitter>
            <FaGithub></FaGithub>
          </div>
        </nav>
      </div>
      <div class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by DriveRental</p>
        </aside>
      </div>
    </footer>
  )
}

export default Footer