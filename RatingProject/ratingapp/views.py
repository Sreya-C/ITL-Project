from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import Sentence
from django.contrib.auth.models import User, auth
from .forms import SentenceForm
import random

def index(request):
    if request.user.is_authenticated:
        user_sentences = Sentence.objects.filter(user=request.user)
        print("User sentences:", user_sentences)  # Debug print
        if not user_sentences.exists():
            all_sentences = list(Sentence.objects.all())
            if len(all_sentences) >= 3:
                random_sentences = random.sample(all_sentences, 3)
                for sentence in random_sentences:
                    sentence.pk = None  # Clone the sentence object
                    sentence.user = request.user
                    sentence.save()
            else:
                random_sentences = []
        else:
            random_sentences = user_sentences
        return render(request, 'index.html', {'sentences': random_sentences})
    else:
        return redirect('loginpage')

def save_rating(request):
    if request.method == 'POST':
        sno = request.POST.get('sno')
        rating = request.POST.get('rating')
        # Update rating in the database
        sentence = Sentence.objects.get(pk=sno)
        sentence.rating = rating
        sentence.save()
        return redirect('index')

def sort_table(request):
    column = request.GET.get('column')
    order = request.GET.get('order')
    if column in ['sno', 'source', 'target', 'rating'] and order in ['asc', 'desc']:
        if column == 'rating':
            sentences = Sentence.objects.all().order_by(('' if order == 'asc' else '-') + 'rating')
        else:
            sentences = Sentence.objects.all().order_by(('' if order == 'asc' else '-') + column)
        return render(request, 'index.html', {'sentences': sentences})
    else:
        # Handle invalid sorting request
        return redirect('index')


def add_sentence(request):
    if request.method == 'POST':
        form = SentenceForm(request.POST)
        if form.is_valid():
            sentence = form.save(commit=False)
            sentence.user = request.user
            sentence.save()
            print("Sentence saved:", sentence)  # Debug print
            return redirect('index')
    else:
        form = SentenceForm()
    return render(request, 'add_sentence.html', {'form': form})


from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth

# Your other views...

def signupfunction(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 == password2:
            # Check if username already exists
            if User.objects.filter(username=username).exists():
                return render(request, 'signup.html', {'error': 'Username already exists'})

            # Create user if username is unique and passwords match
            user = User.objects.create_user(username=username, email=email, password=password1)
            user.save()
            return redirect('/loginpage/')  # Redirect to login page
        else:
            # Handle password mismatch error
            return render(request, 'signup.html', {'error': 'Passwords do not match'})

    # If request method is not POST, render the signup form
    return render(request, 'signup.html')

def loginfunction(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        # Authenticate user
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('index')  # Redirect to index page after successful login
        else:
            # Handle invalid login credentials
            return render(request, 'login.html', {'error': 'Invalid username or password'})

    # If request method is not POST, render the login form
    return render(request, 'login.html')




# admin user:
# username: adminuser
# password: adminuser
# email: adminuser@gmail.com
