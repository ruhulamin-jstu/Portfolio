import os
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from PIL import Image

def generate():
    pdf_path = "assets/Mohammad_Ruhul_Amin_CV.pdf"
    os.makedirs("assets", exist_ok=True)
    c = canvas.Canvas(pdf_path, pagesize=A4)
    w, h = A4  # 595.28 x 841.89

    # Colors
    c_sidebar_bg = colors.HexColor("#112130")
    c_teal_accent = colors.HexColor("#0284c7")
    c_emerald = colors.HexColor("#10b981")
    c_orange = colors.HexColor("#f59e0b")
    c_text_white = colors.HexColor("#f8fafc")
    c_text_muted = colors.HexColor("#94a3b8")
    c_dark_heading = colors.HexColor("#0f172a")
    c_dark_body = colors.HexColor("#334155")
    c_dark_muted = colors.HexColor("#64748b")
    c_line_gray = colors.HexColor("#cbd5e1")

    # 1. Left Sidebar Background
    sidebar_w = 205
    c.setFillColor(c_sidebar_bg)
    c.rect(0, 0, sidebar_w, h, fill=True, stroke=False)

    # 2. Profile Photo in Sidebar
    # We crop the profile image to an attractive portrait
    img_src = "assets/images/profile.jpg"
    temp_crop = "scratch_cv_photo.jpg"
    with Image.open(img_src) as im:
        # crop upper body
        w_im, h_im = im.size
        # crop centered from top:
        crop_box = (int(w_im * 0.1), int(h_im * 0.05), int(w_im * 0.9), int(h_im * 0.85))
        im_crop = im.crop(crop_box)
        im_crop.save(temp_crop, quality=95)

    photo_h = 200
    c.drawImage(temp_crop, 0, h - photo_h, width=sidebar_w, height=photo_h, preserveAspectRatio=False)

    # Slanted polygon overlay at bottom of photo
    p = c.beginPath()
    p.moveTo(0, h - photo_h + 30)
    p.lineTo(sidebar_w, h - photo_h)
    p.lineTo(sidebar_w, h - photo_h - 15)
    p.lineTo(0, h - photo_h + 15)
    p.close()
    c.setFillColor(c_teal_accent)
    c.drawPath(p, fill=True, stroke=False)

    p2 = c.beginPath()
    p2.moveTo(0, h - photo_h + 15)
    p2.lineTo(sidebar_w, h - photo_h - 15)
    p2.lineTo(sidebar_w, h - photo_h - 22)
    p2.lineTo(0, h - photo_h + 8)
    p2.close()
    c.setFillColor(c_emerald)
    c.drawPath(p2, fill=True, stroke=False)

    # Sidebar Content Starting Y
    y = h - photo_h - 45
    margin_x = 16

    # Helper: Sidebar Section Header
    def draw_sidebar_header(title, y_pos, icon_color=c_orange):
        c.setFillColor(icon_color)
        c.circle(margin_x + 5, y_pos + 4, 3, fill=True, stroke=False)
        c.setFillColor(c_text_white)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(margin_x + 16, y_pos, title)
        return y_pos - 16

    # --- CONTACT ---
    y = draw_sidebar_header("CONTACT", y, c_orange)
    c.setFont("Helvetica", 8)
    c.setFillColor(c_text_muted)
    c.drawString(margin_x, y, "mohammadrafi11375@gmail.com")
    y -= 13
    c.setFont("Helvetica", 8.5)
    c.drawString(margin_x, y, "+880 1641-386740 (WhatsApp)")
    y -= 13
    c.drawString(margin_x, y, "JSTU, Jamalpur, Bangladesh")
    y -= 13
    c.drawString(margin_x, y, "github.com/ruhulamin-jstu")
    y -= 25

    # --- EDUCATION ---
    y = draw_sidebar_header("EDUCATION", y, c_teal_accent)
    # Degree 1
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(c_text_white)
    c.drawString(margin_x, y, "B.Sc. in Electrical & Electronic Eng.")
    y -= 12
    c.setFont("Helvetica-Oblique", 8)
    c.setFillColor(c_text_muted)
    c.drawString(margin_x, y, "Jamalpur Sci. & Tech. Univ. (JSTU)")
    y -= 11
    c.drawString(margin_x, y, "2nd Year (Session 2023 – 2027)")
    y -= 18

    # Degree 2
    c.setFont("Helvetica-Bold", 8.5)
    c.setFillColor(c_text_white)
    c.drawString(margin_x, y, "Higher Secondary Certificate (HSC)")
    y -= 11
    c.setFont("Helvetica-Oblique", 8)
    c.setFillColor(c_text_muted)
    c.drawString(margin_x, y, "Shahid Syed Nazrul Islam College")
    y -= 11
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(c_emerald)
    c.drawString(margin_x, y, "GPA: 5.00 / 5.00 (Golden A+)")
    y -= 18

    # Degree 3
    c.setFont("Helvetica-Bold", 8.5)
    c.setFillColor(c_text_white)
    c.drawString(margin_x, y, "Secondary School Certificate (SSC)")
    y -= 11
    c.setFont("Helvetica-Oblique", 8)
    c.setFillColor(c_text_muted)
    c.drawString(margin_x, y, "Mamun Smrity Public School")
    y -= 11
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(c_emerald)
    c.drawString(margin_x, y, "GPA: 5.00 / 5.00 (Golden A+)")
    y -= 25

    # --- SKILLS ---
    y = draw_sidebar_header("SKILLS", y, c_orange)
    skills = [
        "MATLAB & Simulink",
        "Circuit Simulation & Analysis",
        "Control Systems Modeling",
        "Drone Flight Dynamics",
        "Arduino & Embedded C/C++",
        "Coupled DC Dynamos & Relays",
        "Power Recovery Electronics",
        "Sensors & Transducers",
        "Aerial Cinematography"
    ]
    for sk in skills:
        c.setFillColor(c_orange)
        c.rect(margin_x + 2, y + 2, 3, 3, fill=True, stroke=False)
        c.setFont("Helvetica", 8.5)
        c.setFillColor(c_text_muted)
        c.drawString(margin_x + 12, y, sk)
        y -= 13
    y -= 12

    # --- AWARDS & ACTIVITIES ---
    y = draw_sidebar_header("AWARDS & HONORS", y, c_teal_accent)
    awards = [
        ("Academic Excellence", "SSC & HSC Golden A+ 5.00/5.00"),
        ("EEE2108 Simulation Sessional", "Top Presentation Team"),
        ("Robotics & Drone Systems", "JSTU Technical Workshop")
    ]
    for aw_title, aw_sub in awards:
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(c_text_white)
        c.drawString(margin_x, y, "• " + aw_title)
        y -= 10
        c.setFont("Helvetica", 7.5)
        c.setFillColor(c_text_muted)
        c.drawString(margin_x + 8, y, aw_sub)
        y -= 13

    # =========================================================================
    # 3. RIGHT MAIN COLUMN (White background)
    # =========================================================================
    rx = 225
    rw = w - rx - 25

    # Header Name
    c.setFillColor(c_dark_heading)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(rx, h - 55, "Mohammad")
    c.drawString(rx, h - 85, "Ruhul Amin (Rafi)")

    # Title Subtitle
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(c_teal_accent)
    c.drawString(rx, h - 105, "EEE Undergraduate · Drone Systems & Circuit Simulation")

    # Divider line
    c.setStrokeColor(c_line_gray)
    c.setLineWidth(1)
    c.line(rx, h - 116, rx + rw, h - 116)

    # --- PROFILE ---
    py = h - 138
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(c_dark_heading)
    c.drawString(rx, py, "Profile")
    py -= 15

    c.setFont("Helvetica", 9)
    c.setFillColor(c_dark_body)
    profile_lines = [
        "Dedicated 2nd-year Electrical and Electronic Engineering student at Jamalpur Science and",
        "Technology University (JSTU) specializing in Circuit Simulation, Control Systems, and",
        "Hardware Prototypes. Passionate about drone aerial technology, regenerative energy",
        "recovery, and engineering automated solutions that bridge digital logic with the physical world."
    ]
    for line in profile_lines:
        c.drawString(rx, py, line)
        py -= 12

    # --- PROJECTS & WORK EXPERIENCE ---
    py -= 10
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(c_dark_heading)
    c.drawString(rx, py, "Projects & Research Experience")
    py -= 18

    # Timeline vertical line
    timeline_x = rx + 8
    content_x = rx + 26
    c.setStrokeColor(c_line_gray)
    c.setLineWidth(1.5)
    c.line(timeline_x, py + 5, timeline_x, py - 435)

    def draw_timeline_node(y_node, date_str, title_str, role_str, bullets):
        # Draw node circle
        c.setFillColor(colors.white)
        c.setStrokeColor(c_teal_accent)
        c.setLineWidth(2)
        c.circle(timeline_x, y_node + 3, 4.5, fill=True, stroke=True)

        # Date & Institution
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(c_dark_muted)
        c.drawString(content_x, y_node, date_str)
        y_curr = y_node - 13

        # Project Title & Role
        c.setFont("Helvetica-Bold", 10.5)
        c.setFillColor(c_dark_heading)
        c.drawString(content_x, y_curr, title_str)
        y_curr -= 12

        c.setFont("Helvetica-BoldOblique", 8.5)
        c.setFillColor(c_teal_accent)
        c.drawString(content_x, y_curr, role_str)
        y_curr -= 12

        # Bullets
        c.setFont("Helvetica", 8.5)
        c.setFillColor(c_dark_body)
        for b in bullets:
            c.drawString(content_x, y_curr, "•  " + b[0])
            y_curr -= 11
            if len(b) > 1:
                c.drawString(content_x + 8, y_curr, b[1])
                y_curr -= 11
        return y_curr - 8

    # Project 1: Water Tank
    bullets_p1 = [
        ("Modeled closed-loop fluid reservoir level control using MATLAB & Simulink", "under Lecturer Md. Mahfuzur Hayan (Course EEE2108)."),
        ("Simulated dynamic inflow pump actuation and real-time overflow protection cutoff.", ""),
        ("Presented comprehensive simulation analysis as member of a 6-student team at JSTU.", "")
    ]
    py = draw_timeline_node(py, "2024 — Present | Department of EEE, JSTU",
                            "Automated Water Tank Level Control System",
                            "Circuit Simulation Researcher (Matlab / Simulink)",
                            bullets_p1)

    # Project 2: Regenerative Braking
    bullets_p2 = [
        ("Engineered physical hardware prototype capturing vehicle kinetic braking energy", "using mechanically coupled dual DC motor dynamo setup."),
        ("Integrated Arduino microcontroller, 5V relay switching, and DC-DC buck-boost", "voltage regulation to charge battery storage during deceleration."),
        ("Demonstrated live working prototype in EEE lab; produced verified video demonstration.", "")
    ]
    py = draw_timeline_node(py, "2024 | EEE Laboratory, JSTU",
                            "Smart Regenerative Braking System Prototype",
                            "Hardware Prototype & Power Electronics Lead",
                            bullets_p2)

    # Project 3: Plant Watering
    bullets_p3 = [
        ("Developed autonomous precision irrigation device with soil moisture sensor,", "mini submersible DC water pump, and 18650 Li-ion battery source."),
        ("Programmed automated moisture threshold switching via 5V relay module to", "conserve water and eliminate overwatering risks.")
    ]
    py = draw_timeline_node(py, "2023 — 2024 | Embedded Hardware Lab",
                            "Automatic Plant Watering & Smart Irrigation System",
                            "Embedded Systems & IoT Developer",
                            bullets_p3)

    # Project 4: Drone & Photography
    bullets_p4 = [
        ("Investigating multirotor aerodynamics, flight controllers, and ESC brushless motors.", ""),
        ("Curated 23 original visual perspective frames capturing landscapes", "across diverse rural and natural terrains of Bangladesh.")
    ]
    py = draw_timeline_node(py, "2023 — Present | Aerial Tech & Visuals",
                            "Drone Aerial Systems & Perspective Photography",
                            "Drone Enthusiast & Visual Storyteller",
                            bullets_p4)

    # --- REFERENCES ---
    py -= 5
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(c_dark_heading)
    c.drawString(rx, py, "References")
    py -= 15

    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(c_dark_heading)
    c.drawString(rx, py, "Department of Electrical and Electronic Engineering (EEE)")
    py -= 11
    c.setFont("Helvetica", 8)
    c.setFillColor(c_dark_muted)
    c.drawString(rx, py, "Jamalpur Science and Technology University (JSTU), Jamalpur, Bangladesh")
    py -= 10
    c.drawString(rx, py, "Academic & Coursework References available upon request: info@jstu.ac.bd")

    c.save()
    if os.path.exists(temp_crop):
        os.remove(temp_crop)
    print("Successfully generated assets/Mohammad_Ruhul_Amin_CV.pdf")

if __name__ == "__main__":
    generate()
